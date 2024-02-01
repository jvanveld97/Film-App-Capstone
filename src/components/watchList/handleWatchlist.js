import { addNewFilmToWatchlist } from "../services/getFilms"

export const handleWatchlist = (film, currentUser) => {
  const newUserWatchlistFilmObj = {
    userId: currentUser.id,
    tmdbId: film.id,
    ...film,
  }
  addNewFilmToWatchlist(newUserWatchlistFilmObj)
}
