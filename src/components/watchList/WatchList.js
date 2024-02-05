import { useEffect, useState } from "react"
import {
  getWatchlistFilmsByUserId,
  removeWatchlistFilm,
} from "../services/getFilms"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

export const WatchList = ({ currentUser }) => {
  const [myWatchlistFilms, setMyWatchlistFilms] = useState([])

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
  }, [])

  return (
    <div className="watchlist-container">
      <h2 style={{ textAlign: "center" }}>Films to Watch</h2>
      {myWatchlistFilms.map((film) => (
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
              Genre: {film.genres?.map((genre) => genre.name)}
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
