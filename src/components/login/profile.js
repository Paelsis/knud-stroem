import React from "react"
import { getUser } from "../../services/auth"
import AddPhotoMultiple from "../image/AddPhotoMultiple"

export default () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().displayName?getUser().displayName:"Display name unknown !"}</li>
      <li>E-mail: {getUser().email}</li>
      {getUser().uid?
        <li><img src={getUser().photoURL} height={200} alt='No profile image'/></li>

      :null  
      }  
      <li>
          <AddPhotoMultiple />
      </li>

    </ul>
  </>
)
