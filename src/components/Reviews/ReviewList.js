import { useEffect, useState } from "react"
import { getReviewsList } from "../services/getReviews"
import { Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

export const ReviewList = ({ currentUser }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviewsList().then((reviewsArray) => {
      setReviews(reviewsArray)
    })
  }, [])

  return (
    <div className="watchlist-container">
      <button style={{ marginRight: "5px" }}>My Reviews</button>
      <button>All Reviews</button>
      <h2 style={{ textAlign: "center" }}>Reviews</h2>
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="container"
          color="success"
          inverse
          style={{ marginBottom: "10px" }}
        >
          <CardBody>
            <Link to={`/review-details/${review.id}`}>
              <CardTitle tag="h4">{review.reviewTitle}</CardTitle>
            </Link>
            <p>
              {review.userName}'s Rating: {review.userRating}
            </p>
            <img
              className="film-image"
              //   key={film.id}
              style={{
                width: "165px",
                height: "225px",
                margin: "20px",
              }}
              src={`https://image.tmdb.org/t/p/w500${review.filmPoster}`}
              alt="Film Poster"
            />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
