import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { updateReview } from "../services/getReviews"

export const EditReviewForm = ({
  currentUser,
  review,
  isOpen,
  toggleModal,
  setReview,
}) => {
  console.log("rendered")
  const handleUpdate = (event) => {
    const changedReviewObj = structuredClone(review)
    updateReview(changedReviewObj)
  }

  const handleInputChange = (event) => {
    const stateCopy = { ...review }
    stateCopy[event.target.name] = event.target.value
    setReview(stateCopy)
  }

  const handleRadioChangeYes = (event) => {
    const stateCopy = { ...review }
    stateCopy.isRecommended = true
    setReview(stateCopy)
  }
  const handleRadioChangeNo = (event) => {
    const stateCopy = { ...review }
    stateCopy.isRecommended = false
    setReview(stateCopy)
  }

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        Update a Review for {review.filmTitle}
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
                style={{ margin: "5px", width: "350px" }}
                type="text"
                name="reviewTitle"
                value={review.reviewTitle}
                onChange={handleInputChange}
              ></input>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label>Rating:</label>
              <input
                style={{ margin: "5px" }}
                type="number"
                name="userRating"
                value={review.userRating}
                onChange={handleInputChange}
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
                  checked={review.isRecommended}
                  onChange={handleRadioChangeYes}
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  style={{ margin: "5px" }}
                  type="radio"
                  id="no"
                  checked={!review.isRecommended}
                  onChange={handleRadioChangeNo}
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
                name="reviewBody"
                value={review.reviewBody}
                style={{
                  height: "150px",
                  width: "400px",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  verticalAlign: "top",
                  lineHeight: "normal",
                  textAlign: "start",
                  margin: "5px",
                }}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          color="primary"
          onClick={() => {
            handleUpdate(review)
          }}
        >
          Update Review
        </button>{" "}
        <button color="secondary" onClick={toggleModal}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  )
}
