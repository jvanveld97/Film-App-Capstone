import React, { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import "./FilmList.css"
import { Link } from "react-router-dom"
import { handleWatchlist } from "./watchList/handleWatchlist"

function Movie({ currentUser }) {
  const [filmList, setFilmList] = useState([])
  const [genreList, setGenreList] = useState([])
  const [filter, setFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const apiKey = `api_key=5fdee37d435b4908168dfca5173bb7b1`

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const getFilm = () => {
    // let totalFilms = [] make it so multiple fetches grab 3 as much movies per page.
    const random = Math.floor(Math.random() * 200)
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=5fdee37d435b4908168dfca5173bb7b1&certification=18A&certification_country=US&page=${random}`
    )
      .then((res) => res.json())
      .then((json) => setFilmList(json.results))
  }

  const getGenre = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`)
      .then((res) => res.json())
      .then((json) => setGenreList(json.genres))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getFilm()
    getGenre()
  }, [])

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

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
        <label style={{ margin: "10px" }}>Filter by Genre</label>
        <select name="filter" value={filter} onChange={handleChangeFilter}>
          <option value="">--All--</option>
          {genreList?.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          apiKey={apiKey}
        />
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
              </div>
            ))
          : filteredFilms?.map((film) => (
              <div className="filtered-film-container">
                <img
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
                  <h2 className="film-title">{film.title}</h2>
                </Link>
                <label>Release Date {film.release_date}</label>
                <label>Review Average {film.vote_average}</label>
                <button
                  onClick={() => {
                    handleWatchlist(film, currentUser)
                  }}
                >
                  Add to Watch List
                </button>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Movie
