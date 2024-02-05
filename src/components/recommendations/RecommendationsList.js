import { useEffect, useState } from "react"
import {
  getRecommendedFilmsByUserId,
  removeRecommendationFilm,
} from "../services/getFilms"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

export const RecommendationsList = ({ currentUser }) => {
  const [myRecommendationFilms, setMyRecommendationFilms] = useState([])

  const getMyRecommendations = () => {
    getRecommendedFilmsByUserId(currentUser.id).then((myFilmsArray) => {
      setMyRecommendationFilms(myFilmsArray)
    })
  }

  const handleRemove = (filmId) => {
    removeRecommendationFilm(filmId).then(getMyRecommendations())
  }

  useEffect(() => {
    getMyRecommendations()
  }, [])

  return (
    <div className="watchlist-container">
      <h2 style={{ textAlign: "center" }}>My Recommendations</h2>
      {myRecommendationFilms.map((film) => (
        <Card
          key={film.id}
          className="container"
          color="warning"
          inverse
          style={{ marginBottom: "10px" }}
        >
          <CardBody>
            <Link to={`/film-details/${film.tmdbId}`}>
              <CardTitle tag="h4">{film.title}</CardTitle>
            </Link>
            <p key={film.id}>
              Genre: {film.genres?.map((genre) => genre.name)}
            </p>
            <p>
              Runtime:{" "}
              {film.runtime === 0 ? "No recorded runtime" : film.runtime}{" "}
              minutes
            </p>
            <p>TMDB Review Score: {film.vote_average}</p>
            <img
              className="film-image"
              //   key={film.id}
              style={{
                width: "165px",
                height: "225px",
                margin: "20px",
              }}
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
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
