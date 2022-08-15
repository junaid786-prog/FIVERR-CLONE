import HeroSection from "../components/HeroSection"

import "../css/mainHeader.css"
import Services from "../components/Services"
import TalentSection from "../components/TalentSection"
import Footer from "../components/Footer"
const HomePage = () => {
  return (
    <div className="home_page">
      <HeroSection />
      <Services />
      <TalentSection />
      <Footer />
    </div>
  )
}

export default HomePage
