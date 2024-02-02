import { addNewFilmToWatchlist, getFilmById } from "../services/getFilms"

export const handleWatchlist = (film, currentUser, location) => {
  let newUserWatchlistFilmObj = {}

  if (location === "details") {
    newUserWatchlistFilmObj = film
    newUserWatchlistFilmObj.userId = currentUser.id
    newUserWatchlistFilmObj.tmdbId = film.id
    newUserWatchlistFilmObj.isRecommended = false

    addNewFilmToWatchlist(newUserWatchlistFilmObj)
  } else {
    getFilmById(film.id).then((filmObj) => {
      newUserWatchlistFilmObj = filmObj
      newUserWatchlistFilmObj.userId = currentUser.id
      newUserWatchlistFilmObj.tmdbId = filmObj.id
      newUserWatchlistFilmObj.isRecommended = false

      addNewFilmToWatchlist(newUserWatchlistFilmObj)
    })
  }
}
