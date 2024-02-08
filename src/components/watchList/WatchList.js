import { useEffect, useState } from "react"
import {
  getWatchlistFilmsByUserId,
  removeWatchlistFilm,
} from "../services/getFilms"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

export const WatchList = ({ currentUser }) => {
  const [myWatchlistFilms, setMyWatchlistFilms] = useState([])
  const [genreList, setGenreList] = useState([])
  const [filter, setFilter] = useState("")

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
  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
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
      </div>
      <h2 style={{ textAlign: "center" }}>Films to Watch</h2>
      {filteredFilms?.map((film) => (
        <Card
          key={film.id}
          className="container"
          color="dark"
          inverse
          style={{ marginBottom: "10px" }}
        >
          <CardBody>
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
            <Button
              color="danger"
              onClick={(event) => {
                handleRemove(event.target.value)
              }}
              value={film.id}
            >
              Remove
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
