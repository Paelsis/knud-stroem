import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'

export default () => {
      const [hover, handleHover] = useState(undefined) 
      const [click, handleClick] = useState(undefined) 
      return (
        <StaticQuery
          query={graphql`
          query {
            allImageSharp {
               edges {
                 node {
                   fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid_noBase64
                      originalName
                   }
                 }
               }
             }
           }
          `}
          render={data => {
            return (
              <div className="columns is-multiline" >
                 {data.allImageSharp.edges.map(it=>
                  <div 
                    className={click===it.node.fluid.originalName?"column is-6 is-12-mobile":"column is-2 is-2 is-6-mobile"} style={{opacity:hover===it.node.fluid.originalName?1.0:1.5, transition:'1000ms all ease'}} 
                    onMouseEnter={()=>handleHover(it.node.fluid.originalName)}
                    onMouseLeave={()=>handleHover(undefined)}
                    onClick={()=>handleClick(click?undefined:it.node.fluid.originalName)}
                  >
                    <Img fluid={it.node.fluid} backgroundColor='red'/>
                    <small>{it.node.fluid.originalName}</small>
                  </div>
                )}
              </div>
            )
          }}
        />
      )
  }
  

