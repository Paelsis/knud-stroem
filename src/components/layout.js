/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} hoverTitle={data.site.siteMetadata?.hoverTitle || `Hover Title`}  />
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
          © {new Date().getFullYear()}, Knud Strøm
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
