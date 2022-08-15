import React from "react"
import Slider from "react-slick"

const Alert = () => {
  var s = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrow: false,
  }
  return (
    <div className="bb">
      <Slider {...s}>
        <div>
          <p>1</p>
          <p>3</p>
          <p>6</p>
        </div>
        <div>
          <p>10</p>
          <p>30</p>
          <p>60</p>
        </div>{" "}
        <div>
          <p>100</p>
          <p>300</p>
          <p>600</p>
        </div>
      </Slider>
    </div>
  )
}

export default Alert
