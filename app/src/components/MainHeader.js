import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import fiverr_logo_main from "../assets/fiverr_logo_main.png"
import avtar_1 from "../assets/avtar_1.jpg"
import "../css/mainHeader.css"
import {
  logoutUserAction,
  userProfileAction,
} from "../redux/actions/userAction"
import { Link, useNavigate } from "react-router-dom"
import { Circles } from "react-loader-spinner"

const MainHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(userProfileAction)
  }, [])
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.userProfile
  )
  return !loading ? (
    <div className="fiverr_header">
      <div className="main_header">
        <div className="main_header_left">
          <div className="main_header_logo">
            <img
              className="main_header_logo_img"
              src={fiverr_logo_main}
              alt="Fiverr.com"
            />
          </div>
          <div className="main_header_search_bar">
            {/* <SearchIcon className="icon" /> */}
            <input placeholder="Find Services" />
            <button className="btn">Search</button>
          </div>
        </div>
        <div className="main_header_right">
          <ul>
            <li>Fiverr Business</li>
            <li>Explore</li>
            <li>English</li>
            <li>PKR</li>
            <li>Become Seller</li>
            {!isAuthenticated ? (
              <Link to="/login">
                <li>Sign In</li>
              </Link>
            ) : (
              <li
                onClick={() => {
                  dispatch(logoutUserAction)
                  navigate("/")
                  window.location.reload()
                }}
              >
                Log Out
              </li>
            )}
          </ul>
          {!isAuthenticated ? (
            <Link to="/register">
              <button className="btn">Join</button>
            </Link>
          ) : (
            <div className="avtar">
              <Link to="/buyer/me">
                <img
                  src={user && user.avtar ? user.avtar.url : avtar_1}
                  alt={user.name}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner">
      <Circles />
    </div>
  )
}

export default MainHeader
