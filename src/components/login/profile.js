import React from "react"
import { getUser } from "../../services/auth"
const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().displayName?getUser().displayName:"Display name unknown !"}</li>
      <li>E-mail: {getUser().email}</li>
      {getUser().uid?
        <li>Used Id: {getUser().uid}</li>
      :null  
      }  
    </ul>
  </>
)
export default Profile