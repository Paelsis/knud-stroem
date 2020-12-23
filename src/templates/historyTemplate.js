import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import variables from "../components/layout.scss" 

const src = `https://source.unsplash.com/random/600x600`  
const bblack = '#2b2523'
const videoSrcURL = '../videos/knud_video1.MP4'

const showVideo = () =>
  <div className="video">
  <iframe
    src={videoSrcURL}
    title={'Knud the painter'}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    frameBorder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowFullScreen
  />
  </div>


export default (props) => {
  const [hover, setHover] = useState({})
  const Hline = ({leftText, rightText}) =>
    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
      {leftText?<div style={{float:'left', marginTop:'auto', fontSize:20}}>{leftText}</div>:null}
      {rightText?<div style={{float:'right', marginTop:'auto', fontSize:10}}>{rightText}</div>:null}
    </div>
  const handleMouseEnter = (name) => setHover({...hover, [name]:undefined})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})

  return (
    <StaticQuery
      query={graphql`{
        allMarkdownRemark(filter: {frontmatter: {language: {}, slug: {regex: "/history/"}}}, sort: {fields: frontmatter___date, order: ASC}) {
          nodes {
            frontmatter {
              title
              slug
              date
              year
              src
              language
            }
            html
          }
        }
        allImageSharp(filter: {fluid: {originalName: {regex: "/HISTORY/"}}}, sort: {order: ASC, fields: resolutions___originalName}) {
          edges {
            node {
              fluid {
                originalName
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }

      }
    `}

    render={data => {
      const edges = data.allImageSharp.edges
      const fluid = edges?(index) => edges[Math.max(0, Math.min(index, edges.length-1))]?edges[Math.max(0, Math.min(index, edges.length-1))].node.fluid:undefined:undefined
      return(
              <>
                {data.allMarkdownRemark.nodes.filter((it) => it.frontmatter.language === props.language).map((it, index) =>
                  <div>
                    <div className="columns">
                      <div className="column is-5" 
                        style={{backgroundColor:hover['div1']?undefined:undefined, transition:'2000ms all ease'}} 
                        onMouseLeave={()=>handleMouseLeave('div1')}
                      >
                        {fluid?                                                 
                          <div  style={{position:'relative'}}>
                            <Img fluid={fluid(index)} backgroundColor={"grey"} style={{cursor:'pointer'}}/>
                            <div style={{position:'absolute', opacity:0.6, bottom:6, right:8, fontSize:'x-small', color:'white'}}>Photo:Magnus Jönsson</div>  
                          </div>
                        :null}  
                      </div>
                      <div 
                          className="column is-6 is-offset-1"
                          onMouseEnter={()=>handleMouseEnter('div2')}
                          onMouseLeave={()=>handleMouseLeave('div2')}
                      >
                          <Hline leftText={it.frontmatter.title} rightText={undefined} />
                          <hr style = {{width:'100%', backgroundColor:variables.orange, height:'2px'}}/>
                          <div dangerouslySetInnerHTML={{ __html:it.html}} />
                      </div>
                    </div>
                    <div style={{color:'white', height:20}} />        
                          
                  </div>
                )}
              </>
      )
    }}
    />
  )      
  
}

