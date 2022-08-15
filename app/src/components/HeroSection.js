import React from "react"
import fiverr_hero_2 from "../assets/fiverr_hero.jpg"
import "../css/heroSection.css"
const HeroSection = () => {
  return (
    <div className="hero_section">
      <div className="left_hero_section">
        <div className="left_hero_section_heading">
          <h1 className="f_family">
            Find the perfect <span>freelance</span> <br />
            services for your business
          </h1>
        </div>
        <div className="left_hero_section_input">
          <input placeholder="Try 'Building mobile apps'"></input>
          <button className="btn">Search</button>
        </div>
        <div className="left_hero_section_categories">
          <ul>
            <li>Popular:</li>
            <li>Website design</li>
            <li>Wordpress</li>
            <li>Logo design</li>
            <li>NFT Art</li>
          </ul>
        </div>
      </div>
      <div className="right_hero_section">
        <div className="right_hero_section_img">
          <img src={fiverr_hero_2} alt="fiverr hero img" />
          <div className="hero_image_name f_family">
            Andie <span>fashion designer</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
