import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../services/userService"
import { useState } from "react"

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "film_user",
          JSON.stringify({
            id: createdUser.id,
            username: createdUser.username,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Film App</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="username"
              id="username"
              className="auth-form-input"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
