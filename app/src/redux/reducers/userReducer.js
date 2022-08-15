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

export const RegisterNewUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}

export const LoginUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}
export const LogoutUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: action.payload,
      }
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        message: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}
export const UserProfile = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        message: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}
