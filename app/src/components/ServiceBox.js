import "../css/servicesSection.css"
const ServiceBox = ({ title, service_name, image }) => {
  return (
    <div className="service_box">
      <div className="service_title f_family">
        <h4>{title}</h4>
        <h2>{service_name}</h2>
      </div>
      <div className="service_image">
        <img src={image} alt={title} />
      </div>
    </div>
  )
}

export default ServiceBox
