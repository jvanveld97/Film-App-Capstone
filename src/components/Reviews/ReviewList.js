import { useEffect, useState } from "react"
import { getReviewsList } from "../services/getReviews"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import "./ReviewDetails.css"

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOnlyMyReview, reviews])

  return (
    <div className="reviewlist-container">
      <h2 style={{ textAlign: "center", margin: "30px" }}>Reviews</h2>
      <div className="filter-buttons">
        <Button
          color="danger"
          style={{ marginRight: "5px" }}
          onClick={() => {
            setShowOnlyMyReview(true)
          }}
        >
          My Reviews
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setShowOnlyMyReview(false)
          }}
        >
          All Reviews
        </Button>
      </div>
      {filteredReviews.map((review) => (
        <Card
          key={review.id}
          className="container"
          color="info"
          inverse
          style={{ marginBottom: "10px", width: "800px" }}
        >
          <div className="card-body-container">
            <CardBody className="reviewlist-card-body">
              <div className="film-info-container">
                <Link to={`/review-details/${review.id}`}>
                  <CardTitle tag="h4">{review.reviewTitle}</CardTitle>
                </Link>
                <p>
                  {review.userName}'s Rating: {review.userRating}
                </p>
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
                  src={`https://image.tmdb.org/t/p/w500${review.filmPoster}`}
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
