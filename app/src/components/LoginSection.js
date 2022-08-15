import "../css/loginPage.css"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUserAction } from "../redux/actions/userAction"
import { useAlert } from "react-alert"

const LoginSection = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // states
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")

  const userForLogin = { gmail, password }

  const { isAuthenticated, message, loading, error } = useSelector(
    (state) => state.loggedinUser
  )
  const navigateNow = () => {
    alert.success("successfully logged in")
    navigate("/")
    window.location.reload()
  }
  const showAlert = (prop) => alert.error(prop)
  const loginUser = () => {
    dispatch(loginUserAction(userForLogin))
  }
  useEffect(() => {
    if (error) showAlert(error)
    if (isAuthenticated) navigateNow()
  }, [isAuthenticated, dispatch, alert, error])

  return (
    <div className="login_section">
      <div className="section_heading">
        <h3>Sign in to Fiverr</h3>
      </div>
      <div className="continue_btns">
        <button className="bg_blue cursor_ptr">Continue with Facebook</button>
        <button className="cursor_ptr">Continue with Google</button>
        <button className="cursor_ptr">Continue with Apple</button>
        <hr />
        <input
          placeholder="Email / Username"
          className="login_first_input"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login_input"></div>
      <div className="login_btn">
        <button className="cursor_ptr" onClick={loginUser}>
          Continue
        </button>
      </div>
      <div className="rememberence">
        <div className="remember_me">
          <input type={"checkbox"} checked={true} />
          <p className="login_p">Remember me</p>
        </div>
        <p className="c_green login_p cursor_ptr">Forgot Password</p>
      </div>
      <div className="line">
        <hr />
      </div>
      <div className="joining_section">
        <p className="login_p">
          Not already member?{" "}
          <Link to="/register">
            {" "}
            <span className="c_green cursor_ptr">Join now</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginSection
