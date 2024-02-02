import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ReviewForm = () => {
  const [review, setReview] = useState({})

  const navigate = useNavigate()

  return (
    <form>
      <h2>Create Film Review for {}</h2>
      <fieldset></fieldset>
    </form>
  )
}
