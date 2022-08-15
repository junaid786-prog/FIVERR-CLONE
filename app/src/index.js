import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"

import Store from "./redux/Store"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={Store}>
          <App />
        </Provider>
      </AlertProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
