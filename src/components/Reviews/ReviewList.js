import { useEffect, useState } from "react"
import { getReviewsList } from "../services/getReviews"
import { Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

export const ReviewList = ({ currentUser }) => {
  const [reviews, setReviews] = useState([])
  const [showOnlyMyReview, setShowOnlyMyReview] = useState(false)
  const [filteredReviews, setFilteredReviews] = useState([])

  useEffect(() => {
    getReviewsList().then((reviewsArray) => {
      setReviews(reviewsArray)
    })
  }, [])

  useEffect(() => {
    if (showOnlyMyReview) {
      const myReviews = reviews.filter(
        (review) => review.userId === currentUser.id
      )
      setFilteredReviews(myReviews)
    } else {
      setFilteredReviews(reviews)
    }
  }, [showOnlyMyReview, reviews])

  return (
    <div className="watchlist-container">
      <button
        style={{ marginRight: "5px" }}
        onClick={() => {
          setShowOnlyMyReview(true)
        }}
      >
        My Reviews
      </button>
      <button
        onClick={() => {
          setShowOnlyMyReview(false)
        }}
      >
        All Reviews
      </button>
      <h2 style={{ textAlign: "center" }}>Reviews</h2>
      {filteredReviews.map((review) => (
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
