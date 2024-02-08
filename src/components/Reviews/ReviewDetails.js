import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getReviewsById, removeReview } from "../services/getReviews"
import "./ReviewDetails.css"
import { EditReviewForm } from "./EditReviewForm"

export const ReviewDetails = ({ currentUser }) => {
  const [review, setReview] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    getReviewsById(id).then((filmObj) => {
      const reviewObj = filmObj[0]
      setReview(reviewObj)
    })
  }, [id])

  const handleDelete = (reviewId) => {
    removeReview(reviewId).then(() => {
      navigate(`/reviews`)
    })
  }

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
      <div>
        {currentUser.id === review.userId ? (
          <>
            <button style={{ margin: "5px" }} onClick={toggleModal}>
              Edit
            </button>
            <EditReviewForm
              currentUser={currentUser}
              isOpen={modal}
              toggleModal={toggleModal}
              review={review}
              setReview={setReview}
              id={id}
            />
            <button
              style={{ margin: "5px" }}
              value={review.id}
              onClick={(event) => {
                handleDelete(event.target.value)
              }}
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  )
}
