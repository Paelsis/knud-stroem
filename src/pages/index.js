import React, {useState} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from '../templates/indexTemplate'

export default () => 
    <Layout>
        <SEO title="Home page" />
        <Template />
    </Layout>

