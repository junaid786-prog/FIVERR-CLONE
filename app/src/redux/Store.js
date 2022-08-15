import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { LoginUser, RegisterNewUser, UserProfile } from "./reducers/userReducer"
import {
  CreateNewGig,
  GetFavGigs,
  GetMyGigs,
  GetSingleGig,
  LikeGig,
} from "./reducers/gigReducer"

const middelWare = [thunk]
const RootReducer = combineReducers({
  registeredUser: RegisterNewUser,
  loggedinUser: LoginUser,
  userProfile: UserProfile,

  createdGig: CreateNewGig,
  myGigs: GetMyGigs,
  singleGig: GetSingleGig,
  likedGig: LikeGig,
  myFavGigs: GetFavGigs,
})
const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middelWare))
)
export default Store
