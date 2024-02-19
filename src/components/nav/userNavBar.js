import { NavLink, useNavigate } from "react-router-dom"
import { NavItem, Navbar } from "reactstrap"
import "./userNavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <Navbar color="dark" className="navbar">
      <NavItem className="navbar-item">
        <NavLink className="navbar-link" to="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem className="navbar-item">
        <NavLink className="navbar-link" to="/my-watchlist">
          My Watchlist
        </NavLink>
      </NavItem>
      <NavItem className="navbar-item">
        <NavLink className="navbar-link" to="/my-recommendations">
          Recommendations
        </NavLink>
      </NavItem>
      <NavItem className="navbar-item">
        <NavLink className="navbar-link" to="/reviews">
          Reviews
        </NavLink>
      </NavItem>
      {localStorage.getItem("film_user") ? (
        <NavItem className="navbar-item navbar-logout">
          <NavLink
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("film_user")
              navigate("/login", { replace: true })
            }}
          >
            Logout
          </NavLink>
        </NavItem>
      ) : (
        ""
      )}
    </Navbar>
  )
}
