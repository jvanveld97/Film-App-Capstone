export const getReviewsList = async () => {
  const response = await fetch(`http://localhost:8088/reviews`)
  return await response.json()
}
export const getReviewsById = async (id) => {
  const response = await fetch(`http://localhost:8088/reviews?id=${id}`)
  return await response.json()
}
