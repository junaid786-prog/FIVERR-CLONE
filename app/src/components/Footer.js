import React from "react"
import "../css/footer.css"
// cateories about community more from fiverr gh

const Categories = [
  "Grapics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Audio & Music",
  "Proramming & Tech",
  "Data",
  "Business",
  "Life style",
]
const Footer = () => {
  return (
    <div className="footer_section f_family">
      <div className="footer_cateories f_item">
        <h4>Categories</h4>
        <ul>
          {Categories.map((c) => {
            return <li>{c}</li>
          })}
        </ul>
      </div>
      <div className="footer_about f_item">
        <h4>About</h4>
        <ul>
          <li>Careers</li>
          <li>Press & News</li>
          <li>Privacy Policy</li>
          <li>Partnership</li>
          <li>Terms & Conditions</li>
          <li>Investor Relations</li>
        </ul>
      </div>
      <div className="footer_community f_item">
        <h4>Community</h4>
        <ul>
          <li>Events</li>
          <li>Blogs</li>
          <li>Forum</li>
          <li>Podcast</li>
          <li>Communication</li>
          <li>Become Seller</li>
          <li>Invite Friend</li>
        </ul>
      </div>
      <div className="footer_more f_item">
        <h4>More From Fiverr</h4>
        <ul>
          <li>Fiverr Business</li>
          <li>Fiverr Pro</li>
          <li>Learn here</li>
          <li>Get Inspired</li>
          <li>Fiverr Guides</li>
          <li>Investments</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
