import profileImg from "../assets/avtar_1.jpg"
import "../css/dashboard.css"
import { CameraAltOutlined, ModeOutlined } from "@mui/icons-material"
import SmallGig from "./SmallGig"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Circles } from "react-loader-spinner"
import { GetFavGigsAction, GetMyGigsAction } from "../redux/actions/gigAction"
import { useAlert } from "react-alert"

export const ProfileTab = ({ user }) => {
  return (
    <div className="profile_tab">
      <div className="profile_tab_img">
        <img src={profileImg} />
      </div>
      <div className="profile_change_btn">
        <CameraAltOutlined />
        <p>Change Photo</p>
      </div>
      <div className="profile_tab_info">
        <p>{user.name}</p>
        <p>{user.gmail}</p>
        <p>{user.phoneNo}</p>
        <p>From {user.country}</p>
        {user.mode === "seller" && <p>working since {user.joining_year}</p>}
        {user.mode === "seller" && <p>{user.about}</p>}
      </div>
      <div className="profile_change_btn">
        <ModeOutlined />
        <p> Update Profile</p>
      </div>
    </div>
  )
}
export const MessagesTab = ({ user }) => {
  return <div>Messages</div>
}
export const FavoriteGigsTab = ({ changeIndex }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { services, error } = useSelector((state) => state.myFavGigs)
  useEffect(() => {
    dispatch(GetFavGigsAction())
    if (error) {
      alert.error(error)
    }
  }, [])

  return (
    <div className="favorite_gigs_tab">
      <h4>Favorite Gigs</h4>
      {services && services.length === 0 ? (
        <div className="empty">
          <p className="f_family">You do not have any favorite service</p>
          <button className="bg_green f_family" onClick={() => changeIndex(8)}>
            Make Favorite
          </button>
        </div>
      ) : (
        <div className="my_gigs">
          {services &&
            services.map((service) => {
              return <SmallGig service={service} />
            })}
        </div>
      )}
    </div>
  )
}
export const NotificationsTab = () => {
  return <div>Notifications</div>
}
export const OrdersTab = () => {
  return <div>Orders</div>
}

export const MyGigsTab = ({ user, changeIndex }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, message } = useSelector((state) => state.likedGig)

  useEffect(() => {
    dispatch(GetMyGigsAction())
    if (error) {
      alert.error(error)
    } else if (message) {
      alert.success(message)
    }
  }, [error, message, dispatch, alert])

  const { loading, services } = useSelector((state) => state.myGigs)
  return (
    <div className="my_gigs_tab">
      {user.services_offered.length === 0 ? (
        <div className="empty">
          <p className="f_family">You are not offering any service</p>
          <button className="bg_green f_family" onClick={() => changeIndex(6)}>
            Create Gig
          </button>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="spinner">
              <Circles />
            </div>
          ) : (
            <div className="my_gigs">
              {services.map((service) => {
                return <SmallGig service={service} />
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
export const PerformanceTab = () => {
  return <div>Performance</div>
}
