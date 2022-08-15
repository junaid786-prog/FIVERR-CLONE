import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GetSingleGigAction } from "../redux/actions/gigAction"
import { useAlert } from "react-alert"
import pic from "../assets/fiverr_hero.jpg"
import avtar_1 from "../assets/avtar_1.jpg"
import { Circles } from "react-loader-spinner"

import "../css/singlegig.css"
import { Avatar } from "@mui/material"
import { Star } from "@mui/icons-material"
import DisplayPkgTabs from "../components/DisplayPkgTabs"
const SingleGig = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()

  const { loading, service, message } = useSelector((state) => state.singleGig)
  const { user } = useSelector((state) => state.userProfile)
  useEffect(() => {
    dispatch(GetSingleGigAction(params._id))
    console.log(loading, service)
  }, [])

  return !loading ? (
    <div className="gig_page f_family">
      <div className="gig_page_left">
        <div className="gig_page_title pd_5">
          <h2>{service.title}</h2>
        </div>
        <div className="gig_page_user_info pd_5">
          <Avatar>
            <img src={avtar_1} />
          </Avatar>
          <p>{user.name}</p>
          <p>Level 2 Seller | </p>
          <Star className="c_orange" />
          <Star className="c_orange" />
          <Star className="c_orange" />
          <Star className="c_orange" />
          <Star className="c_orange" />
          <p>(45)</p>
        </div>
        <div className="gig_page_images pd_5">
          <img src={pic} />
        </div>
        <div className="gig_page_description pd_10">
          <h3>About This Gig</h3>
          <p className="pd_10">{service.description}</p>
        </div>
        <div className="gig_page_about_seller pd_10">
          <h3>About The Seller</h3>
          <div className="about_seller_top pd_10">
            <div className="about_seller_avtar">
              <img src={avtar_1} />
            </div>
            <div className="about_seller_info">
              <p className="pd_5">{user.name}</p>
              <div className="c_orange pd_5">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <div className="btn pd_5">
                <button>Contact Me</button>
              </div>
            </div>
          </div>
          <div className="about_seller_bottom pd_10">
            <div className="bottom_info">
              <div className="bottom_info_box">
                <p>
                  From <span>{user.country}</span>
                </p>
                <p>
                  Member Since <span>{user.country}</span>
                </p>
              </div>
              <div className="bottom_info_box">
                <p>
                  Response Time <span>1 hour</span>
                </p>
                <p>
                  Last Delivery <span>2 days ago</span>
                </p>
              </div>
            </div>
            <hr></hr>
            <div className="bottom_description pd_10">
              <p>{service.description}</p>
            </div>
          </div>
        </div>
        <div className="gig_page_packages pd_10">
          <h3>Compare Packages</h3>
          <div className="gig_page_packages_box">
            <div className="box_1 box">
              <p className="item_1">Package</p>
              <p className="item_2">Revision</p>
              <p className="item_3">Delivery Time</p>
              <p className="item_4">Total</p>
            </div>
            {service.packages &&
              service.packages.map((pkg) => {
                return (
                  <div className="gig_page_pkg">
                    <div className="item_1">
                      <div className="gig_page_pkg_name">
                        <p>{pkg.package_name}</p>
                      </div>
                      <div className="gig_page_pkg_description">
                        <p>{pkg.package_description}</p>
                      </div>
                    </div>
                    <div className="gig_page_pkg_revisions item_2">
                      <p>unlimited</p>
                    </div>
                    <div className="gig_page_pkg_deleviry_time item_3">
                      <p>2 days</p>
                    </div>
                    <div className="gig_page_pkg_price item_4 last">
                      <p>{pkg.package_price}$</p>
                      <div className="pd_10 select">
                        <button className="bg_green">Select</button>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <div className="gig_page_right">
        <DisplayPkgTabs service={service} />
      </div>
    </div>
  ) : (
    <div className="spinner">
      <Circles />
    </div>
  )
}

export default SingleGig
