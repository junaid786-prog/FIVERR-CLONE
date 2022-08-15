import { TaskAlt } from "@mui/icons-material"
import "../css/talentSection.css"

const TalentSection = () => {
  return (
    <div className="talent_section_container">
      <div className="talent_section f_family">
        <div className="talent_section_left">
          <div className="talent_section_left_heading">
            <h3>A whole world of freelance talent at your fingertips</h3>
          </div>
          <div className="talent_section_bullets">
            <TaskAlt />
            <p>The best for every budget</p>
          </div>
          <p className="talent_section_bullets_p">
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className="talent_section_bullets">
            <TaskAlt />
            <p>Quality work done quickly</p>
          </div>
          <p className="talent_section_bullets_p">
            Find the right freelancer to begin working on your project within
            minutes.
          </p>
          <div className="talent_section_bullets">
            <TaskAlt />
            <p>Protected payments, every time</p>
          </div>
          <p className="talent_section_bullets_p">
            Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.
          </p>
          <div className="talent_section_bullets">
            <TaskAlt />
            <p>24/7 support</p>
          </div>
          <p className="talent_section_bullets_p">
            Questions? Our round-the-clock support team is available to help
            anytime, anywhere.
          </p>
        </div>
        <div className="talent_section_right"></div>
      </div>
    </div>
  )
}

export default TalentSection
