import { Link, useNavigate } from "react-router-dom"
import "./userNavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/my-watchlist">
          My Watchlist
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/my-recommendations">
          Recommendations
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/reviews">
          Reviews
        </Link>
      </li>
      {localStorage.getItem("film_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("film_user")
              navigate("/login", { replace: true })
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}
