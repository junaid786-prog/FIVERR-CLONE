import { Routes, Route } from "react-router-dom"
import BuyerDashboard from "./components/BuyerDashboard"
import HomePage from "./pages/HomePage"
import Loginpage from "./pages/Loginpage"
import RegisterPage from "./pages/RegisterPage"
import SingleGig from "./pages/SingleGig"
import MainHeader from "./components/MainHeader"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Alert from "./components/alert"

const App = () => {
  return (
    <div className="App">
      <MainHeader />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/login" element={<Loginpage />}></Route>
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/buyer/me" element={<BuyerDashboard />} />
        <Route exact path="/gig/:_id" element={<SingleGig />} />
        <Route exact path="/c" element={<Alert />} />
      </Routes>
    </div>
  )
}

export default App
