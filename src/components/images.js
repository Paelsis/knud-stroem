import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'

export default class Image extends React.Component {
    render(){
      return (
        <StaticQuery
          query={graphql`
          query {
            allImageSharp {
              edges {
                node {
                  fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                    originalName
                  }
                }
              }
            }
          }
          `}
          render={data => {
            return (
              <div className="columns is-multiline" style={{width:'80vw', marginLeft:'auto', marginRight:'auto'}}>
              {data.allImageSharp.edges.map(it=>
                <div className="column is-2" style={{justifyContent:'center'}}>
                <h4>{it.node.fixed.originalName}</h4>
                <Img
                        fixed={it.node.fixed}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        alt=""
                />
                </div>
              )}
              </div>
            )
          }}
        />
      )
    }
  }
  

