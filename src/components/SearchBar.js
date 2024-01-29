export const SearchBar = ({
  setSearchTerm,
  searchTerm,
  setSearchResults,
  apiKey,
}) => {
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${searchTerm}&adult=false`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results)
        })
    }
  }

  return (
    <div className="search-bar">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
        type="text"
        placeholder="Search Films"
        value={searchTerm}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
