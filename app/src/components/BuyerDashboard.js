import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  userProfileAction,
  logoutUserAction,
} from "../redux/actions/userAction"
import "../css/dashboard.css"

import {
  ProfileTab,
  MessagesTab,
  FavoriteGigsTab,
  NotificationsTab,
  OrdersTab,
  MyGigsTab,
  PerformanceTab,
} from "./Tabs"
import CreateGigTab from "./GigCreation"
import { Circles } from "react-loader-spinner"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined"
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined"
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import Avatar from "@mui/material/Avatar"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import AddIcon from "@mui/icons-material/Add"
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined"
import Add from "@mui/icons-material/Add"

const BuyerDashboard = () => {
  const dispatch = useDispatch()
  const [tabIndex, setTabIndex] = useState(1)
  useEffect(() => {
    dispatch(userProfileAction)
  }, [])
  const changeIndex = (i) => setTabIndex(i)
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.userProfile
  )
  const logoutUser = () => {
    dispatch(logoutUserAction)
  }
  return !loading && isAuthenticated ? (
    <div className="dashboard_section">
      <div className="dashboard_sidebar">
        <div
          className={
            tabIndex === 1 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(1)}
        >
          <AccountCircleOutlinedIcon /> <p>Profile</p>
        </div>
        <div
          className={
            tabIndex === 2 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(2)}
        >
          <MessageOutlinedIcon /> <p>Messages</p>
        </div>
        <div
          className={
            tabIndex === 3 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(3)}
        >
          <FavoriteBorderOutlinedIcon /> <p>Favorite Gigs</p>
        </div>
        <div
          className={
            tabIndex === 4 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(4)}
        >
          <NotificationAddOutlinedIcon /> <p>Notifications</p>
        </div>
        <div
          className={
            tabIndex === 5 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(5)}
        >
          <ShoppingCartOutlinedIcon /> <p>Orders</p>
        </div>
        <div
          className={
            tabIndex === 6 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(6)}
        >
          <Add /> <p>Create Gig</p>
        </div>
        <div
          className={
            tabIndex === 7 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(7)}
        >
          <ModeOutlinedIcon /> <p>Create Gig</p>
        </div>
        <div
          className={
            tabIndex === 8 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(8)}
        >
          <LabelOutlinedIcon /> <p>My Gigs</p>
        </div>
        <div
          className={
            tabIndex === 9 ? "active sidebar_options" : "sidebar_options"
          }
          onClick={() => setTabIndex(9)}
        >
          <DonutLargeOutlinedIcon /> <p>Performance</p>
        </div>
      </div>
      <div className="dashboard_tabs">
        <div className={tabIndex === 1 ? "d_block single_tab" : "d_none"}>
          <ProfileTab user={user} />
        </div>
        <div className={tabIndex === 2 ? "d_block single_tab" : "d_none"}>
          <MessagesTab user={user} />
        </div>
        <div className={tabIndex === 3 ? "d_block single_tab" : "d_none"}>
          <FavoriteGigsTab user={user} changeIndex={changeIndex} />
        </div>
        <div className={tabIndex === 4 ? "d_block single_tab" : "d_none"}>
          <NotificationsTab />
        </div>
        <div className={tabIndex === 5 ? "d_block single_tab" : "d_none"}>
          <OrdersTab />
        </div>
        <div className={tabIndex === 6 ? "d_block single_tab" : "d_none"}>
          <CreateGigTab />
        </div>
        <div className={tabIndex === 7 ? "d_block single_tab" : "d_none"}>
          {/* <CreateGigTab /> */}
        </div>
        <div className={tabIndex === 8 ? "d_block single_tab" : "d_none"}>
          <MyGigsTab user={user} changeIndex={changeIndex} />
        </div>
        <div className={tabIndex === 9 ? "d_block single_tab" : "d_none"}>
          <PerformanceTab />
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner">
      <Circles />
    </div>
  )
}

export default BuyerDashboard
