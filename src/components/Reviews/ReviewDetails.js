import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getReviewsById } from "../services/getReviews"
import "./ReviewDetails.css"

export const ReviewDetails = ({ currentUser }) => {
  const [review, setReview] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getReviewsById(id).then((filmObj) => {
      const reviewObj = filmObj[0]
      setReview(reviewObj)
    })
  }, [id])

  return (
    <section className="review-container">
      <img
        className="film-image"
        key={review.id}
        style={{
          width: "350px",
          height: "500px",
          margin: "20px",
        }}
        src={`https://image.tmdb.org/t/p/w500${review.filmPoster}`}
        alt="Film Poster"
      />
      <h2>Film Title: {review.filmTitle}</h2>
      <h2>
        {review.userName}'s Rating: {review.userRating}
      </h2>
      <h3>
        {review.userName} said {review.reviewTitle} :
      </h3>
      <p>"{review.reviewBody}"</p>
      {/* if currentUser.username === review.userName then display button */}
      <div>{currentUser.id === review.userId ? <button>Edit</button> : ""}</div>
    </section>
  )
}
