import "../css/loginPage.css"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { registerUserAction } from "../redux/actions/userAction"
import { useAlert } from "react-alert"

const SignupSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  // states
  const [name, setName] = useState("")
  const [gmail, setGmail] = useState("")
  const [country, setCountry] = useState("")
  const [phoneNo, setPhoneno] = useState()
  const [avtar, setAvtar] = useState("")
  const [avtarName, setAvtarName] = useState("Select Avtar File")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")

  const userForRegisteration = {
    name,
    gmail,
    country,
    phoneNo,
    password,
    avtar,
  }

  const { isAuthenticated, message, loading, error } = useSelector(
    (state) => state.registeredUser
  )

  const convert = (e) => {
    const f = e.target.files[0]
    if (f.size / 1000 > 500) alert.error("File size must be less than 500 KB")
    else {
      setAvtarName(f.name)
      setFileToBase(f)
    }
  }
  const setFileToBase = (f) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(f)
    fileReader.onloadend = () => {
      setAvtar(fileReader.result)
    }
  }

  const registerUser = () => {
    if (!avtar) alert.error("Insert Avtar")
    else if (password !== cPassword)
      alert.error("Password and confirm password are not same")
    else {
      dispatch(registerUserAction(userForRegisteration))
    }
  }
  useEffect(() => {
    if (error)
      if (typeof error === "string") alert.error(error)
      else {
        for (let err in error) {
          alert.error(error[err])
        }
      }
    if (isAuthenticated) {
      navigate("/")
      window.location.reload()
    }
  }, [isAuthenticated, dispatch, alert, error])
  return (
    <div className="login_section">
      <div id="alert"></div>
      <div className="section_heading">
        <h3>Sign Up to Fiverr</h3>
      </div>
      <div className="continue_btns">
        <input
          placeholder="Name"
          className="login_first_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone No"
          value={phoneNo}
          onChange={(e) => setPhoneno(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
      </div>
      <div className="upload_file_wrapper" data-text={avtarName}>
        <input
          name="file_upload_field"
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          value=""
          onChange={convert}
        />
        <br />
      </div>
      <div className="login_btn mt_20">
        <button className="cursor_ptr" onClick={registerUser}>
          Continue
        </button>
      </div>
      <div className="line">
        <hr />
      </div>
      <div className="joining_section">
        <p className="login_p">
          Already registered?
          <Link to="/login">
            <span className="c_green cursor_ptr"> Login now</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupSection
