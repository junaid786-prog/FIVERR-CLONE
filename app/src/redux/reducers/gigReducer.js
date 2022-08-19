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

export const CreateNewGig = (state = { gig: {} }, action) => {
  switch (action.type) {
    case CREATE_GIG_REQUEST:
      return {
        loading: true,
        gig: {},
      }
    case CREATE_GIG_SUCCESS: {
      return {
        loading: false,
        gig: action.payload.gig,
        message: action.payload.message,
      }
    }
    case CREATE_GIG_FAIL: {
      return {
        loading: false,
        gig: {},
        error: action.payload,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export const GetMyGigs = (state = { services: [{}] }, action) => {
  switch (action.type) {
    case MY_GIGS_REQUEST: {
      return {
        loading: true,
        services: [{}],
      }
    }
    case MY_GIGS_SUCCESS: {
      return {
        loading: false,
        services: action.payload,
      }
    }
    case MY_GIGS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      }
    }
    default:
      return { ...state }
  }
}

export const GetSingleGig = (state = { service: {} }, action) => {
  switch (action.type) {
    case SINGLE_GIG_REQUEST: {
      return {
        loading: true,
        service: {},
      }
    }
    case SINGLE_GIG_SUCCESS: {
      return {
        loading: false,
        service: action.payload,
      }
    }
    case SINGLE_GIG_FAIL: {
      return {
        loading: false,
        error: action.payload,
        service: {},
      }
    }
    default:
      return { ...state }
  }
}

export const LikeGig = (state = {}, action) => {
  switch (action.type) {
    case LIKE_GIG_REQUEST:
      return {
        loading: true,
      }
    case LIKE_GIG_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      }
    case LIKE_GIG_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return { ...state }
  }
}

export const UnLikeGig = (state = {}, action) => {
  switch (action.type) {
    case UN_LIKE_GIG_REQUEST:
      return {
        loading: true,
      }
    case UN_LIKE_GIG_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      }
    case UN_LIKE_GIG_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return { ...state }
  }
}

export const GetFavGigs = (state = {}, action) => {
  switch (action.type) {
    case MY_FAV_GIGS_REQUEST:
      return {
        loading: true,
      }
    case MY_FAV_GIGS_SUCCESS:
      return {
        loading: false,
        services: action.payload,
      }
    case MY_FAV_GIGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return { ...state }
  }
}
