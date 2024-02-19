import React, { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import "./FilmList.css"
import { Link } from "react-router-dom"
import { handleWatchlist } from "./watchList/handleWatchlist"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

function Movie({ currentUser }) {
  const [filmList, setFilmList] = useState([])
  const [genreList, setGenreList] = useState([])
  const [filter, setFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen((prevState) => !prevState)
  // const location = useLocation()

  const apiKey = `api_key=5fdee37d435b4908168dfca5173bb7b1`

  const handleChangeFilter = (selectedValue) => {
    setFilter(selectedValue)
  }

  const getFilm = () => {
    // let totalFilms = [] make it so multiple fetches grab 3 as much movies per page.
    const numberOfPages = 3
    const randomPages = Array.from({ length: numberOfPages }, () =>
      Math.floor(Math.random() * 500)
    )
    const fetchRequests = randomPages.map((page) =>
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=5fdee37d435b4908168dfca5173bb7b1&certification=R&certification_country=US&page=${page}`
      ).then((res) => res.json())
    )

    Promise.all(fetchRequests).then((results) => {
      const combinedResults = results.flatMap((result) => result.results)
      setFilmList(combinedResults)
    })
  }

  const getGenre = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`)
      .then((res) => res.json())
      .then((json) => setGenreList(json.genres))
  }

  useEffect(() => {
    const fetchData = async () => {
      await getFilm()
      await getGenre()
      window.scrollTo(0, 0)
    }

    fetchData()
  }, [])

  // const handleSearchResults = (results) => {
  //   setSearchResults(results)
  // }

  let filteredFilms = filmList

  // Check if a filter is selected
  if (filter) {
    // Use the Array.filter() method to create a new array with films that match the filter condition
    filteredFilms = filteredFilms.filter((film) =>
      // Use Array.some() to check if at least one genre_id of the film matches the filter
      film.genre_ids.some(
        (genreId) =>
          // Use Array.find() to find the genre with the matching id in the genreList
          genreList.find((genre) => genre.id === genreId)?.name === filter
      )
    )
  }

  return (
    <div>
      <div className="search-filter-component">
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          apiKey={apiKey}
        />
        {/* <label style={{ margin: "10px" }}>Filter by Genre</label>
        <select name="filter" value={filter} onChange={handleChangeFilter}>
          <option value="">--All--</option>
          {genreList?.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select> */}
        <Dropdown
          style={{ margin: "10px" }}
          isOpen={dropdownOpen}
          toggle={toggle}
        >
          <DropdownToggle caret>Filter by Genre</DropdownToggle>
          <DropdownMenu>
            <DropdownItem value="" onClick={() => handleChangeFilter()}>
              --All--
            </DropdownItem>
            {genreList?.map((genre) => (
              <DropdownItem
                key={genre.id}
                onClick={() => handleChangeFilter(genre.name)}
              >
                {genre.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="main-container">
        {searchResults?.length > 0
          ? searchResults.map((film) => (
              <div className="search-film-container">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  className="film-image"
                  key={film.id}
                  style={{
                    width: "275px",
                    height: "400px",
                    margin: "20px",
                  }}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt="Film Poster"
                />
                <Link to={`film-details/${film.id}`}>
                  <label className="film-title">{film.title}</label>
                </Link>
                <label>Release Date {film.release_date}</label>
                <label>Review Average {film.vote_average}</label>
                <Button
                  className="watchlist-button"
                  onClick={() => {
                    handleWatchlist(film, currentUser, "list")
                  }}
                >
                  Add to Watch List
                </Button>
              </div>
            ))
          : filteredFilms?.map((film) => (
              <div className="filtered-film-container">
                <img
                  className="film-image"
                  key={film.id}
                  style={{
                    width: "275px",
                    height: "400px",
                    margin: "20px",
                  }}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt="Film Poster"
                />
                <Link to={`film-details/${film.id}`}>
                  <label className="film-title">{film.title}</label>
                </Link>
                <label>Release Date {film.release_date}</label>
                <label>Review Average {film.vote_average}</label>
                <Button
                  style={{ margin: "5px" }}
                  onClick={() => {
                    handleWatchlist(film, currentUser, "list")
                  }}
                >
                  Add to Watch List
                </Button>
              </div>
            ))}
      </div>
      <Button
        onClick={() => {
          window.location.reload()
          // window.scrollTo(0, 0)
        }}
      >
        More Films
      </Button>
    </div>
  )
}

export default Movie
