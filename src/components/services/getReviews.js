export const getReviewsList = async () => {
  const response = await fetch(`http://localhost:8088/reviews`)
  return await response.json()
}
export const getReviewsById = async (id) => {
  const response = await fetch(`http://localhost:8088/reviews?id=${id}`)
  return await response.json()
}
export const getReviewsByUserId = async (userId) => {
  const response = await fetch(`http://localhost:8088/reviews?userId=${userId}`)
  return await response.json()
}
export const addNewReview = async (newReviewObj) => {
  const res = await fetch(`http://localhost:8088/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReviewObj),
  })
  return await res.json()
}
export const updateReview = (review) => {
  return fetch(`http://localhost:8088/reviews/${review.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  })
}
export const removeReview = (reviewId) => {
  return fetch(`http://localhost:8088/reviews/${reviewId}`, {
    method: "DELETE",
  })
}
