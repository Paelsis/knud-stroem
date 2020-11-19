import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from '../templates/thumnailLeftTemplate'

export default ({location}) => {
    const search = location.search?location.search:undefined
    const year = search?search.split('?')[1].split('&')[0]:undefined
    const olderThan = search?search.indexOf('olderThan') !== -1?"olderThan":undefined:undefined
    console.log('year', year, 'olderThan', olderThan)
    return(
    <Layout>
        <SEO title="Home page" />
         <h2 style={{opacity:0.9, color:'orange', textAlign:'center'}}>{olderThan?"Older than ":""} {year}</h2>
        <Template year={year} olderThan={olderThan} />
    </Layout>
    )
}
