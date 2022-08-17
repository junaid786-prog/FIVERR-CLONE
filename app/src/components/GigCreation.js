import "../css/dashboard.css"
import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  Add,
  BackupOutlined,
  TaskAlt,
  ArrowDropDown,
  Camera,
} from "@mui/icons-material"

import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { createRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PackageCreateTab from "./PackageCreateTab"
import { CreateGigAction } from "../redux/actions/gigAction"
import { useAlert } from "react-alert"
import Multiselect from "multiselect-react-dropdown"

const CreateGigTab = () => {
  const multiselectRef = createRef()
  const dispatch = useDispatch()
  const alert = useAlert()
  // state to store editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  // state to save tab to be viewed index
  const [tabIndex, setTabIndex] = useState(1)
  // states to store content of  a gig
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [packages, setPackages] = useState([])
  const [images, setimages] = useState("../assets/avtar_1.jpg")
  const [imageName, setimageName] = useState("Select File")
  // state for downdrop
  const [isActive, setIsActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Category")
  const [multiselectOptions, setMultiselectOptions] = useState([])
  // functions
  // Editor functions
  const convertContent = () => {
    let currentContent = editorState.getCurrentContent()
    setDescription(currentContent.getPlainText("\u0001"))
  }
  const hadleEditorStateChange = (state) => {
    setEditorState(state)
    convertContent()
  }
  //
  const addPackageData = (packageData) => {
    if (packages.length < 2) packages.push(packageData)
  }
  const increaseIndex = () => {
    if (tabIndex == 3) {
      console.log("max ")
    } else {
      setTabIndex(tabIndex + 1)
    }
  }
  const decreaseIndex = () => {
    if (tabIndex == 1) {
      console.log("min")
    } else {
      setTabIndex(tabIndex - 1)
    }
  }

  let tags = new Array()
  multiselectOptions.map((o) => tags.push(o.Tag))

  const dataToRegister = {
    title,
    description,
    packages,
    category: selectedOption,
    tags,
    images,
  }

  const { loading, message, gig, error } = useSelector(
    (state) => state.createdGig
  )

  const gigUpload = () => {
    // if (packages.length < 2) alert.error("at least two packaes are must")
    // else dispatch(CreateGigAction(dataToRegister))
    dispatch(CreateGigAction(dataToRegister))
  }

  useEffect(() => {
    if (error) {
      if (typeof error === "string") alert.error(error)
      else {
        for (let err in error) {
          alert.error(error[err])
        }
      }
      setPackages([])
    }
    if (gig && gig.title && gig.title !== "") {
      alert.success(message)
      window.location.reload()
    }
  }, [message, dispatch, alert, error])
  // options of toolbar of editor
  const editorOptions = ["inline", "list", "textAlign"]

  const Categories = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Audio & Music",
    "Proramming & Tech",
  ]
  const Tags = [
    { Tag: "design", category: "Graphics & Design" },
    { Tag: "amazing design", category: "Graphics & Design" },
    { Tag: "heavy graphics", category: "Graphics & Design" },
    { Tag: "graphics and design", category: "Graphics & Design" },
    { Tag: "boost ranking", category: "Digital Marketing" },
    { Tag: "diital marketing", category: "Digital Marketing" },
    { Tag: "sell online", category: "Digital Marketing" },
    { Tag: "digital ads", category: "Digital Marketing" },
    { Tag: "content writing", category: "Writing & Translation" },
    { Tag: "article writing", category: "Writing & Translation" },
    { Tag: "content translation", category: "Writing & Translation" },
    { Tag: "writing and translation", category: "Writing & Translation" },
    { Tag: "video editing", category: "Video & Animation" },
    { Tag: "voice over", category: "Video & Animation" },
    { Tag: "animated video", category: "Video & Animation" },
    { Tag: "video and animation", category: "Video & Animation" },
    { Tag: "audio editing", category: "Audio & Music" },
    { Tag: "voice over", category: "Audio & Music" },
    { Tag: "listen music", category: "Audio & Music" },
    { Tag: "audio and music", category: "Audio & Music" },
    { Tag: "web development", category: "Proramming & Tech" },
    { Tag: "app development", category: "Proramming & Tech" },
    { Tag: "machine learning", category: "Proramming & Tech" },
    { Tag: "proramming and tech", category: "Proramming & Tech" },
  ]

  const rel_tags = Tags.filter((t) => t.category === selectedOption)
  const convert = (e) => {
    const f = e.target.files[0]
    setimageName(f.name)
    setFileToBase(f)
  }
  const setFileToBase = (f) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(f)
    fileReader.onloadend = () => {
      setimages(fileReader.result)
    }
  }
  return (
    <div className="gig_creation_tab  f_family">
      <div className="gig_creation_sections">
        <div className="gig_creation_tab_left">
          <div
            className={
              tabIndex === 1
                ? "gig_creation_tab_1"
                : "gig_creation_tab_1 d_none"
            }
          >
            <div className="gig_creation_title">
              <p>Title</p>
              <input
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className="gig_creation_description">
              <p>Description</p>
              <Editor
                editorState={editorState}
                onEditorStateChange={hadleEditorStateChange}
                wrapperClassName="editor_wrapper"
                editorClassName="editor_class"
                toolbar={{ options: editorOptions }}
              />
            </div>
          </div>
          <div className="gig_creation_tab_2">
            <h4 className={tabIndex !== 2 ? "d_none" : "d_block"}>Packages</h4>
            <div className="gig_creation_packages">
              <PackageCreateTab
                updateData={addPackageData}
                tabIndex={tabIndex}
              />
              <PackageCreateTab
                updateData={addPackageData}
                tabIndex={tabIndex}
              />
            </div>
          </div>
          <div className={tabIndex === 3 ? "gig_creation_tab_3" : "d_none"}>
            <p className="pd_10">Select Category</p>
            <div className="category_input">
              <p>{selectedOption}</p>
              <ArrowDropDown onClick={() => setIsActive(!isActive)} />
            </div>
            <div className={isActive ? "categories_drop_down" : "d_none"}>
              {Categories.map((c, index) => {
                return (
                  <p
                    onClick={() => {
                      setSelectedOption(c)
                      setIsActive(false)
                    }}
                    key={index}
                  >
                    {c}
                  </p>
                )
              })}
            </div>
            <p className="pd_10">Select Tags</p>

            <div className="pd_10">
              <Multiselect
                options={rel_tags}
                displayValue="Tag"
                ref={multiselectRef}
                onSelect={() =>
                  setMultiselectOptions(
                    multiselectRef.current.getSelectedItems()
                  )
                }
                onRemove={() =>
                  setMultiselectOptions(
                    multiselectRef.current.getSelectedItems()
                  )
                }
              />
            </div>
            <div className="pd_50">
              <p>Upload gig image</p>
            </div>
            <div className="upload_file_wrapper" data-text={imageName}>
              <input
                name="file_upload_field"
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                value=""
                onChange={convert}
              />
              <br />
            </div>
          </div>
        </div>
        <div className="gig_creation_tab_right">
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
        </div>
      </div>
      <div className="gig_creation_keys">
        <ArrowBackOutlined onClick={decreaseIndex} />
        {tabIndex !== 3 ? (
          <ArrowForwardOutlined onClick={increaseIndex} />
        ) : (
          <div className="submit_btn add_package_btn">
            <button type="submit" className="bg_green" onClick={gigUpload}>
              <BackupOutlined /> submit gig
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default CreateGigTab
