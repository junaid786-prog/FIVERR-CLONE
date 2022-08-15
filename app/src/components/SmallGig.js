import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material"
import { Avatar } from "@mui/material"
import { useEffect } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import pic from "../assets/fiverr_hero.jpg"
import "../css/dashboard.css"
import { LikeGigAction } from "../redux/actions/gigAction"
const SmallGig = ({ service }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const addToFavorite = (id) => {
    //console.log(id)
    dispatch(LikeGigAction(id))
  }

  return (
    <div className="small_gig">
      <div className="small_gig_img pd_5">
        <img src={pic} />
      </div>
      <div className="small_gig_title pd_5">
        <Link to={`/gig/${service._id}`}>
          <p>{service.title}</p>
        </Link>
      </div>
      <div className="small_gig_bottom pd_5">
        <Avatar>
          <img src={pic} />
        </Avatar>
        <p className="f_bold">
          {service && service.packages && service.packages[0].package_price}$
        </p>
        <FavoriteBorderOutlined onClick={() => addToFavorite(service._id)} />
      </div>
    </div>
  )
}

export default SmallGig
