export const getFilmById = async (filmId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=5fdee37d435b4908168dfca5173bb7b1&language=en-US`
  )
  return await response.json()
}
export const getWatchlistFilmsByUserId = async (userId) => {
  const response = await fetch(
    `http://localhost:8088/userFilms?userId=${userId}`
  )
  return await response.json()
}
export const getRecommendedFilmsByUserId = async (userId) => {
  const response = await fetch(
    `http://localhost:8088/userRecommendations?userId=${userId}`
  )
  return await response.json()
}

export const getVideosByFilmId = async (filmId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=5fdee37d435b4908168dfca5173bb7b1&language=en-US`
  )
  return await response.json()
}
export const addNewFilmToWatchlist = async (film) => {
  const res = await fetch(`http://localhost:8088/userFilms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  })
  return await res.json()
}

export const addNewFilmToRecommendations = async (film) => {
  const res = await fetch(`http://localhost:8088/userRecommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  })
  return await res.json()
}
export const removeWatchlistFilm = (filmId) => {
  return fetch(`http://localhost:8088/userFilms/${filmId}`, {
    method: "DELETE",
  })
}
export const removeRecommendationFilm = (filmId) => {
  return fetch(`http://localhost:8088/userRecommendations/${filmId}`, {
    method: "DELETE",
  })
}
