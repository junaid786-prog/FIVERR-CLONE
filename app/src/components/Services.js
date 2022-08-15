import React from "react"
import ServiceBox from "./ServiceBox"
import service_logo_design from "../assets/service-logo-design.webp"
import service_wordpress from "../assets/service-wordpress.webp"
import service_animated from "../assets/service-animated-explainer.jpg"
import service_social from "../assets/service-social.webp"
import service_voiceover from "../assets/service-voiceover.jpg"
import "../css/servicesSection.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
const ServicesInfo = [
  {
    title: "Build your brand",
    service_name: "Logo Design",
    image: service_logo_design,
  },
  {
    title: "Customize your site",
    service_name: "WordPress",
    image: service_wordpress,
  },
  {
    title: "Share Your Message",
    service_name: "Voice Over",
    image: service_voiceover,
  },
  {
    title: "Engage Your Audience",
    service_name: "Video Explainer",
    image: service_animated,
  },
  {
    title: "Reach More Customers",
    service_name: "Social Media",
    image: service_social,
  },
  {
    title: "Build your brand",
    service_name: "Logo Design",
    image: service_logo_design,
  },
  {
    title: "Customize your site",
    service_name: "WordPress",
    image: service_wordpress,
  },
  {
    title: "Share Your Message",
    service_name: "Voice Over",
    image: service_voiceover,
  },
  {
    title: "Engage Your Audience",
    service_name: "Video Explainer",
    image: service_animated,
  },
  {
    title: "Reach More Customers",
    service_name: "Social Media",
    image: service_social,
  },
]

const Services = () => {
  const s = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    dots: true,
    arrow: false,
  }
  return (
    <div className="services_section">
      <div className="services_section_heading f_family">
        <h2>Popular professional services</h2>
      </div>
      <div className="services_section_services">
        <Slider {...s}>
          {ServicesInfo.map((service) => {
            return (
              <ServiceBox
                title={service.title}
                service_name={service.service_name}
                image={service.image}
                key={service.service_name}
              />
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default Services
