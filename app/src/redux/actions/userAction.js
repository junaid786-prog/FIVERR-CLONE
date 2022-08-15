import axios from "axios"
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/constants"
const config = {
  headers: { "content-Type": "application/json" },
  withCredentials: true,
}
//const basicUrl = "http://localhost:8000/api/"
export const registerUserAction = (signupData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const res = await axios.post(
      "http://localhost:8000/api/user/register",
      signupData,
      config
    )
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data.message })
  }
}

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST })
  try {
    const res = await axios.post(
      "http://localhost:8000/api/user/login",
      loginData,
      config
    )
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message })
  }
}

export const userProfileAction = async (dispatch) => {
  dispatch({ type: USER_PROFILE_REQUEST })
  try {
    const res = await axios.get(
      "http://localhost:8000/api/user/me/dashboard",
      config
    )
    dispatch({ type: USER_PROFILE_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_PROFILE_FAIL, payload: err.response.data.message })
  }
}

export const logoutUserAction = async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST })
    const res = await axios.get("http://localhost:8000/api/user/logout", config)
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: err.response.data.message })
  }
}
