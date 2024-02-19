import { Button, Col, Input, Row } from "reactstrap"

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
      <Row>
        <Col>
          <Input
            style={{ margin: "10px" }}
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
            type="text"
            placeholder="Search Films"
            value={searchTerm}
          />
        </Col>
        <Col>
          <Button
            style={{ margin: "10px" }}
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Col>
      </Row>
    </div>
  )
}
