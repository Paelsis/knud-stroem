/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { isLoggedIn } from "../services/auth"
import Header from "./header"
import Navbar from "./navbar"
import "./layout.scss"

const Layout = ({ children }) => {
  const loggedIn = isLoggedIn()
  return (
    <>
      <Header/>
      <Navbar loggedIn={loggedIn} />
      <div
        style={{
          margin: `0 auto`, 
          maxWidth: 1350,
          padding: `0 1.0875rem 3.45rem`,
        }}
      >
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, 
          {` `}
          <a href="mailto:knud55@outlook.com?subject=Mail från Knuds WEB-site">Knud Strøm Nielsen</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
