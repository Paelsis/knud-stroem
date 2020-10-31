import React, {useState} from "react"
import Layout from "../components/layout"
import ColumnView from '../components/views/columnView'
import SEO from "../components/seo"


export default () => (
    <Layout>
        <SEO title="Home page" />
        <div>
            <ColumnView />
        </div>
    </Layout>
)
