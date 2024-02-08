import { useEffect, useState } from "react"
import {
  getRecommendedFilmsByUserId,
  removeRecommendationFilm,
} from "../services/getFilms"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import { getReviewsByUserId } from "../services/getReviews"

export const RecommendationsList = ({ currentUser }) => {
  const [myRecommendationFilms, setMyRecommendationFilms] = useState([])
  const [myReviews, setMyReviews] = useState([])
  const navigate = useNavigate()

  const getMyRecommendationsAndReviews = () => {
    getRecommendedFilmsByUserId(currentUser.id).then((myFilmsArray) => {
      setMyRecommendationFilms(myFilmsArray)
    })
    getReviewsByUserId(currentUser.id).then((myReviewsArray) => {
      setMyReviews(myReviewsArray)
    })
  }
  const handleRemove = (filmId) => {
    removeRecommendationFilm(filmId).then(getMyRecommendationsAndReviews())
  }

  useEffect(() => {
    getMyRecommendationsAndReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasReviewForRecommendation = (recommendation) => {
    return (
      recommendation.id &&
      myReviews.some(
        (review) =>
          review.filmId === recommendation.id &&
          review.userId === recommendation.userId
      )
    )
  }

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
            <Link to={`/film-details/${film.id}`}>
              <CardTitle tag="h4">{film.title}</CardTitle>
            </Link>
            <p key={film.id}>
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
            {hasReviewForRecommendation(film) ? (
              <Button
                color="primary"
                onClick={() => {
                  const matchingReview = myReviews.find(
                    (myReview) => myReview.filmId === film.id
                  )

                  if (matchingReview) {
                    navigate(`/review-details/${matchingReview.id}`)
                  }
                }}
              >
                My Review
              </Button>
            ) : null}
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
