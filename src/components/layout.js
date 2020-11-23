/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { isLoggedIn } from "../services/auth"
import Header from "./header"
import Navbar from "./navbar"
import "./layout.scss"

const Layout = ({ children }) => {
  const loggedIn = isLoggedIn()
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        titleSV 
        titleEN
        galleries
      }
    }
  } 
  `)
  const title = {SV:data.site.siteMetadata.titleSV, EN:data.site.siteMetadata.titleEN}
  const galleries = data.site.siteMetadata.galleries
  return (
    <>
      <Header title={title} />
      <Navbar loggedIn={loggedIn} galleries={galleries} />
      <div class="container is-widescreen">
        <main style={{paddingLeft:10, paddingRight:10}}>{children}</main>
        <footer style={{fontWeight:100, fontSize:8, marginTop: `2rem`}}>
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
