import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/userNavBar"
import Movie from "../FilmList"
import { FilmDetails } from "../FilmDetails"
import { WatchList } from "../watchList/WatchList"

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
      </Route>
    </Routes>
  )
}
