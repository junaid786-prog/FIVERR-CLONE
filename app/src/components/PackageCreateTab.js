import { useState } from "react"
import "../css/dashboard.css"
import { Add } from "@mui/icons-material"
import { useAlert } from "react-alert"

const PackageCreateTab = ({ updateData, tabIndex }) => {
  const alert = useAlert()
  const [package_name, setPkgName] = useState("")
  const [package_description, setPkgDescription] = useState("")
  const [package_price, setPkgPrice] = useState(5)

  const addPackageData = () => {
    const gigPackage = {
      package_name,
      package_description,
      package_price,
    }
    alert.info("package is added")
    updateData(gigPackage)
  }
  return (
    <div
      className={
        tabIndex === 2 ? "gig_creation_pkg" : "gig_creation_pkg d_none"
      }
    >
      <div className="package_name">
        <p>Package Name</p>
        <input
          placeholder="i.e silver"
          value={package_name}
          onChange={(e) => setPkgName(e.target.value)}
          required={true}
        />
      </div>
      <div className="package_description">
        <p>Package Description</p>
        <textarea
          placeholder="i.e this package is about..."
          cols="50"
          rows="5"
          value={package_description}
          onChange={(e) => setPkgDescription(e.target.value)}
          required={true}
        />
      </div>
      <div className="package_price">
        <p>Package Price</p>
        <input
          type="number"
          placeholder="i.e 20"
          value={package_price}
          onChange={(e) => setPkgPrice(e.target.value)}
          required={true}
        />
      </div>
      <div className="add_package_btn">
        <button className="bg_green" onClick={addPackageData}>
          <Add /> add package
        </button>
      </div>
    </div>
  )
}

export default PackageCreateTab
