import axios from "axios"
import {
  CREATE_GIG_FAIL,
  CREATE_GIG_REQUEST,
  CREATE_GIG_SUCCESS,
  LIKE_GIG_FAIL,
  LIKE_GIG_REQUEST,
  LIKE_GIG_SUCCESS,
  MY_FAV_GIGS_FAIL,
  MY_FAV_GIGS_REQUEST,
  MY_FAV_GIGS_SUCCESS,
  MY_GIGS_FAIL,
  MY_GIGS_REQUEST,
  MY_GIGS_SUCCESS,
  SINGLE_GIG_FAIL,
  SINGLE_GIG_REQUEST,
  SINGLE_GIG_SUCCESS,
  UN_LIKE_GIG_FAIL,
  UN_LIKE_GIG_REQUEST,
  UN_LIKE_GIG_SUCCESS,
} from "../constants/constants"

const config = {
  headers: { "content-Type": "application/json" },
  withCredentials: true,
}
const config2 = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
  data: { grant_type: "client_credentials" },
  contentLength: 135711,
}
export const CreateGigAction = (gigData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GIG_REQUEST })
    const res = await axios.post(
      "http://localhost:8000/api/gigs/create",
      gigData,
      config2
    )
    dispatch({
      type: CREATE_GIG_SUCCESS,
      payload: { gig: res.data.gig, message: res.data.message },
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: CREATE_GIG_FAIL, payload: err.response.data.message })
  }
}

export const GetMyGigsAction = () => async (dispatch) => {
  try {
    dispatch({ type: MY_GIGS_REQUEST })
    const res = await axios.get("http://localhost:8000/api/gigs/all", config)
    dispatch({ type: MY_GIGS_SUCCESS, payload: res.data.services })
  } catch (err) {
    dispatch({ type: MY_GIGS_FAIL, payload: err.response.data.message })
  }
}

export const GetSingleGigAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_GIG_REQUEST })
    const res = await axios.get(`http://localhost:8000/api/gig/${id}`, config)
    dispatch({ type: SINGLE_GIG_SUCCESS, payload: res.data.gig })
  } catch (err) {
    dispatch({ type: SINGLE_GIG_FAIL, payload: err.response.data.message })
  }
}

export const LikeGigAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_GIG_REQUEST })
    const res = await axios.get(
      `http://localhost:8000/api/gigs/like/${id}`,
      config
    )
    dispatch({ type: LIKE_GIG_SUCCESS, payload: res.data.message })
  } catch (err) {
    dispatch({ type: LIKE_GIG_FAIL, payload: err.response.data.message })
  }
}

export const UnLikeGigAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: UN_LIKE_GIG_REQUEST })
    const res = await axios.get(
      `http://localhost:8000/api/gigs/unlike/${id}`,
      config
    )
    dispatch({ type: UN_LIKE_GIG_SUCCESS, payload: res.data.message })
  } catch (err) {
    dispatch({ type: UN_LIKE_GIG_FAIL, payload: err.response.data.message })
  }
}

export const GetFavGigsAction = () => async (dispatch) => {
  try {
    dispatch({ type: MY_FAV_GIGS_REQUEST })
    const res = await axios.get(
      `http://localhost:8000/api/gigs/favorite`,
      config
    )
    dispatch({ type: MY_FAV_GIGS_SUCCESS, payload: res.data.fav_services })
  } catch (err) {
    dispatch({ type: MY_FAV_GIGS_FAIL, payload: err.response.data.message })
  }
}
