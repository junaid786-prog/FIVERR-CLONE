import React from "react"

const DisplayPkg = ({ pkg }) => {
  return (
    <div className="display_pkg">
      <div className="display_pkg_info">
        <p>{pkg.package_name}</p>
        <p>{pkg.package_price}$</p>
      </div>
      <div className="display_pkg_desc">{pkg.package_description}</div>
      <button>Continue {pkg.package_price}$</button>
    </div>
  )
}

export default DisplayPkg
// //
