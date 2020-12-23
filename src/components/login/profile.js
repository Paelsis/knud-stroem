import React from "react"
import { getUser } from "../../services/auth"
import AddPhotoMultiple from "../image/AddPhotoMultiple"
import ProfileTemplate from "../../templates/profileTemplate"
import { GestureSharp } from "@material-ui/icons"

export default () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().displayName?getUser().displayName:"Display name unknown !"}</li>
      <li>E-mail: {getUser().email}</li>
      <li>
          <AddPhotoMultiple rootdir={getUser().email} subdir='' />
      </li>
      <ProfileTemplate />
    </ul>
  </>
)
