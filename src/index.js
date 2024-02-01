// import React from "react"
// import ReactDOM from "react-dom/client"
// import "./index.css"
// import { App } from "./App"

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
import { App } from "./App"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
