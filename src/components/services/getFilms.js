export const getFilmById = async (filmId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=5fdee37d435b4908168dfca5173bb7b1&language=en-US`
  )
  return await response.json()
}
