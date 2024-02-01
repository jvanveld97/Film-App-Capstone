import { useEffect, useState } from "react"
import { getWatchlistFilmsByUserId } from "../services/getFilms"
import { Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

export const WatchList = ({ currentUser }) => {
  const [myWatchlistFilms, setMyWatchlistFilms] = useState([])

  const getMyWatchlist = () => {
    getWatchlistFilmsByUserId(currentUser.id).then((myFilmsArray) => {
      setMyWatchlistFilms(myFilmsArray)
    })
  }

  useEffect(() => {
    getMyWatchlist()
  }, [])

  return (
    <div className="watchlist-container">
      <h2 style={{ textAlign: "center" }}>Films to Watch</h2>
      {myWatchlistFilms.map((film) => (
        <Card
          key={film.id}
          className="container"
          color="dark"
          inverse
          style={{ marginBottom: "10px" }}
        >
          <CardBody>
            <Link to={`/film-details/${film.tmdbId}`}>
              <CardTitle tag="h4">{film.title}</CardTitle>
            </Link>
            <p key={film.tmdbId}>
              Genre: {film.genres?.map((genre) => genre.name)}
            </p>
            <p>Runtime: {film.runtime} minutes</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
