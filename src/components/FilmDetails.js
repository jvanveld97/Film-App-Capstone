import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getFilmById } from "./services/getFilms"
import "./FilmDetails.css"

export const FilmDetails = ({ currentUser }) => {
  const navigate = useNavigate()
  const [film, setFilm] = useState({})
  const { filmId } = useParams()

  useEffect(() => {
    getFilmById(filmId).then((selectedFilm) => {
      setFilm(selectedFilm)
    })
  }, [filmId])

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
      <h2>Budget: {film.budget === 0 ? "No recorded budget" : film.budget}</h2>
      <h2>
        Box Office: {film.revenue === 0 ? "No recorded budget" : film.revenue}
      </h2>
      <h2>
        Synopsis:
        <p>{film.overview}</p>
      </h2>
      <div className="trailer-card"></div>
    </section>
  )
}