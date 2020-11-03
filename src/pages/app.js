import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/login/privateRoute"
import Profile from "../components/login/profile"
import Login from "../components/login/login"
export default () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)
