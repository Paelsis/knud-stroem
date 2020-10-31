import React, {useState} from "react"
import Layout from "../components/layout"
import Images from '../components/images'
import SEO from "../components/seo"


export default () =>
    <Layout>
        <SEO title="Home page" />
        <div>
            <Images />
        </div>
    </Layout>
