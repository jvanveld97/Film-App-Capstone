import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/userNavBar"
import Movie from "../FilmList"
import { FilmDetails } from "../FilmDetails"
import { WatchList } from "../watchList/WatchList"
import { RecommendationsList } from "../recommendations/RecommendationsList"
import { ReviewList } from "../Reviews/ReviewList"
import { ReviewDetails } from "../Reviews/ReviewDetails"
import { ReviewForm } from "../Reviews/ReviewForm"

export const ApplicationViews = () => {
  const localFilmUser = localStorage.getItem("film_user")
  const currentUser = JSON.parse(localFilmUser)
  return (
    <Routes>
      {/* prettier-ignore */}
      <Route path="/" element={<> <NavBar /> <Outlet /> </>}>
          <Route  index element={<Movie currentUser={currentUser}/>} />
          <Route path="film-details/:filmId" element={<FilmDetails currentUser={currentUser}/>} />
          <Route path="my-watchlist" element={<WatchList currentUser={currentUser}/>} />
          <Route path="my-recommendations" element={<RecommendationsList currentUser={currentUser} />} />
          <Route path="reviews" element={<ReviewList currentUser={currentUser} />} />
          <Route path="review-details/:id" element={<ReviewDetails currentUser={currentUser}/>} />
          <Route path="create-review" element={<ReviewForm currentUser={currentUser} />} />
      </Route>
    </Routes>
  )
}
