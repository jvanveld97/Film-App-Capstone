import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { addNewReview } from "../services/getReviews"

export const ReviewForm = ({ isOpen, toggleModal, film, currentUser }) => {
  const [review, setReview] = useState({})
  useEffect(() => {
    let userObj = {
      userId: currentUser.id,
      userName: currentUser.username,
      filmId: film.id,
      filmPoster: film.poster_path,
      filmTitle: film.title,
      datePosted: new Date().toDateString(),
    }
    setReview(userObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [film])

  const handleChange = (event, reviewProp) => {
    const preReview = structuredClone(review)
    preReview[reviewProp] = event.target.value
    setReview(preReview)
  }
  const handleReviewSubmit = (review) => {
    const storageKey = `film_review_${currentUser.id}_${film.id}`

    if (localStorage.getItem(storageKey)) {
      alert("You have already submitted a review for this film.")
      return
    }
    addNewReview(review)
    localStorage.setItem(storageKey, "true")
  }

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        Write a Review for {film.title}
      </ModalHeader>
      <ModalBody>
        <form>
          <fieldset>
            <div>
              <label>User: {currentUser.username}</label>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label>Review Title:</label>
              <input
                type="text"
                style={{ width: "350px", margin: "5px" }}
                onChange={(event) => {
                  handleChange(event, "reviewTitle")
                }}
              ></input>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label>Rating:</label>
              <input
                type="number"
                style={{ margin: "5px" }}
                onChange={(event) => {
                  handleChange(event, "userRating")
                }}
                placeholder="from a scale 1-10"
              ></input>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label>Would Recommend?</label>
              <div>
                <input
                  style={{ margin: "5px" }}
                  type="radio"
                  id="yes"
                  name="recommendation"
                  value={true}
                  onChange={(event) => {
                    handleChange(event, "isRecommended")
                  }}
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  style={{ margin: "5px" }}
                  type="radio"
                  id="no"
                  name="recommendation"
                  value={false}
                  onChange={(event) => {
                    handleChange(event, "isRecommended")
                  }}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label>Body:</label>
              <textarea
                type="text"
                style={{
                  height: "150px",
                  width: "100%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  verticalAlign: "top",
                  lineHeight: "normal",
                  textAlign: "start",
                  margin: "5px",
                }}
                onChange={(event) => {
                  handleChange(event, "reviewBody")
                }}
              ></textarea>
            </div>
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          color="primary"
          onClick={() => {
            handleReviewSubmit(review)
          }}
        >
          Submit Review
        </button>{" "}
        <button color="secondary" onClick={toggleModal}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  )
}
