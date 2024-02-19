import { useEffect, useState } from "react"
import {
  getWatchlistFilmsByUserId,
  removeWatchlistFilm,
} from "../services/getFilms"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { Link } from "react-router-dom"
import "./WatchList.css"

export const WatchList = ({ currentUser }) => {
  const [myWatchlistFilms, setMyWatchlistFilms] = useState([])
  const [genreList, setGenreList] = useState([])
  const [filter, setFilter] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  const apiKey = `api_key=5fdee37d435b4908168dfca5173bb7b1`

  const getMyWatchlist = () => {
    getWatchlistFilmsByUserId(currentUser.id).then((myFilmsArray) => {
      setMyWatchlistFilms(myFilmsArray)
    })
  }

  const handleRemove = (filmId) => {
    removeWatchlistFilm(filmId).then(getMyWatchlist())
  }

  useEffect(() => {
    getMyWatchlist()
    getGenre()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getGenre = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`)
      .then((res) => res.json())
      .then((json) => setGenreList(json.genres))
  }
  const handleChangeFilter = (selectedValue) => {
    setFilter(selectedValue)
  }

  let filteredFilms = myWatchlistFilms

  // Check if a filter is selected
  if (filter) {
    // Use the Array.filter() method to create a new array with films that match the filter condition
    filteredFilms = filteredFilms.filter((film) =>
      // Use Array.some() to check if at least one genre_id of the film matches the filter
      film.genres.some(
        (genre) =>
          // Use Array.find() to find the genre with the matching id in the genreList
          genreList.find((genreItem) => genreItem.id === genre.id)?.name ===
          filter
      )
    )
  }

  return (
    <div className="watchlist-container">
      <h2 style={{ textAlign: "center", margin: "30px" }}>Films to Watch</h2>
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
      {filteredFilms?.map((film) => (
        <Card
          key={film.id}
          className="container"
          color="dark"
          inverse
          style={{ marginBottom: "10px", width: "800px" }}
        >
          <div className="card-body-container">
            <CardBody className="watchlist-card-body">
              <div className="film-info-container">
                <Link to={`/film-details/${film.tmdbId}`}>
                  <CardTitle tag="h4">{film.title}</CardTitle>
                </Link>
                <p key={film.tmdbId}>
                  Genre:{" "}
                  {film.genres?.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index !== film.genres.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p>
                  Runtime:{" "}
                  {film.runtime === 0 ? "No recorded runtime" : film.runtime}{" "}
                  minutes
                </p>
                <Button
                  color="danger"
                  onClick={(event) => {
                    handleRemove(event.target.value)
                  }}
                  value={film.id}
                >
                  Remove
                </Button>
              </div>
              <div className="film-image-container">
                <img
                  className="film-image"
                  //   key={film.id}
                  style={{
                    width: "165px",
                    height: "225px",
                    margin: "20px",
                  }}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt="Film Poster"
                />
              </div>
            </CardBody>
          </div>
        </Card>
      ))}
    </div>
  )
}
