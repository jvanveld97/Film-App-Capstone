import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  addNewFilmToRecommendations,
  getFilmById,
  getVideosByFilmId,
} from "./services/getFilms"
import "./FilmDetails.css"
import ReactPlayer from "react-player"
import { handleWatchlist } from "./watchList/handleWatchlist"
import { ReviewForm } from "./Reviews/ReviewForm"
import { Button } from "reactstrap"

export const FilmDetails = ({ currentUser }) => {
  const [film, setFilm] = useState({})
  const [filmVideos, setFilmVideos] = useState([])
  const { filmId } = useParams()
  // const location = useLocation()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    getFilmById(filmId).then((selectedFilm) => {
      setFilm(selectedFilm)
    })
    getVideosByFilmId(filmId).then((filmVideos) => {
      setFilmVideos(filmVideos.results)
    })
  }, [filmId])

  const trailerVideo = filmVideos?.find(
    (videoObj) => videoObj.type === "Trailer" || videoObj.type === "Teaser"
  )

  const handleRecommendations = (film, currentUser) => {
    const newFilmRecommendationObj = {
      userId: currentUser.id,
      isReviewed: false,
      ...film,
    }
    addNewFilmToRecommendations(newFilmRecommendationObj)
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <section className="film-container">
      <img
        className="film-image"
        key={film.id}
        style={{
          width: "400px",
          height: "600px",
          margin: "20px",
        }}
        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
        alt="Film Poster"
      />
      <h1 className="film-title">{film.title}</h1>
      <div className="buttons-group">
        <Button
          style={{ margin: "5px" }}
          onClick={() => {
            handleWatchlist(film, currentUser, "details")
          }}
        >
          Add to Watchlist
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => {
            handleRecommendations(film, currentUser)
          }}
        >
          Add to Recommendations
        </Button>
        <Button style={{ margin: "5px" }} onClick={toggleModal}>
          Review
        </Button>
        <ReviewForm
          currentUser={currentUser}
          isOpen={modal}
          toggleModal={toggleModal}
          film={film}
        />
      </div>
      <div className="film-genres">
        <h2>Genres: </h2>
        {film.genres?.map((genre) => (
          <span key={genre.id} style={{ margin: "5px" }}>
            {genre.name}
          </span>
        ))}
      </div>
      <h2>Score: {film.vote_average}</h2>
      <h2>Release Date: {film.release_date}</h2>
      <h2>Runtime: {film.runtime} minutes</h2>
      <h2>
        {film &&
        film.budget !== undefined &&
        film.budget !== null &&
        film.budget !== 0
          ? `Budget: $${film.budget.toLocaleString()}`
          : "No recorded budget"}
      </h2>
      <h2>
        {film &&
        film.revenue !== undefined &&
        film.revenue !== null &&
        film.revenue !== 0
          ? `Box Office: $${film.revenue.toLocaleString()}`
          : "No recorded box office"}
      </h2>
      <h2>
        Synopsis:
        <p>{film.overview}</p>
      </h2>
      <div className="trailer-card">
        <h2>Trailer:</h2>
        {trailerVideo ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
            controls
          />
        ) : (
          <p>No trailer or Teaser Found</p>
        )}
      </div>
    </section>
  )
}
