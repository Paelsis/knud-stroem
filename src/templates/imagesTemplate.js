import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import imagesJson from '../images/images.json'
import { NavigateBeforeSharp } from "@material-ui/icons"

const backgroundColor="#FF7034"

const CLASS_NAME = {
  SMALL:{
    NO_CLICK:"column is-1 is-12-mobile",
    CLICK:"column is-half is-12-mobile"
  },
  NORMAL:{
    NO_CLICK:"column is-2 is-2 is-12-mobile",
    CLICK:"column is-two-thirds is-12-mobile"
  },
  LARGE:{
    NO_CLICK:"column is-3 is-12-mobile",
    CLICK:"column is-three-quarters is-12-mobile"
  },
}

export default () => {
      const [hover, handleHover] = useState(undefined) 
      const [click, handleClick] = useState(undefined) 
      const [size, setSize] = useState(0)
      return (
        <StaticQuery
          query={graphql`
          {
            allImageSharp(filter: {fluid: {originalName: {regex: "/IMG/"}}}, sort: {order: ASC, fields: resolutions___originalName}) {
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
            const image = (originalName) => imagesJson.find(it => it.originalName === originalName.split('.')[0])
            return (
              <div className="columns is-multiline" >
                 <div className="column is-12 is-hidden-mobile" style={{top:-299}}>
                 <span onClick={()=>setSize(size > -1?size-1:size)} >  
                   <ZoomOutIcon size="small" style={{opacity:0.3}} />
                  </span>  
                  &nbsp;
                  <span  onClick={()=>setSize(size < 1?size+1:size)} >
                    <ZoomInIcon size="small" style={{opacity:0.3}}/>  
                  </span>
                 </div>  
                 {data.allImageSharp.edges.map(it=>
                  <div 
                    className={
                      size===-1?click===it.node.fluid.originalName?CLASS_NAME.SMALL.CLICK:CLASS_NAME.SMALL.NO_CLICK
                      :size===1?click===it.node.fluid.originalName?CLASS_NAME.LARGE.CLICK:CLASS_NAME.LARGE.NO_CLICK
                      :click===it.node.fluid.originalName?CLASS_NAME.NORMAL.CLICK:CLASS_NAME.NORMAL.NO_CLICK
                    }
                    style={{opacity:hover===it.node.fluid.originalName?1.0:1.5, transition:'100ms all ease', cursor:'pointer'}} 
                    onMouseEnter={()=>handleHover(it.node.fluid.originalName)}
                    onMouseLeave={()=>handleHover(undefined)}
                    onClick={()=>handleClick(click === it.node.fluid.originalName?undefined:it.node.fluid.originalName)}
                  >
                    <Img fluid={it.node.fluid} backgroundColor={backgroundColor} style={{cursor:'pointer'}} />
                    {click === it.node.fluid.originalName?
                      <small>{image(it.node.fluid.originalName)?image(it.node.fluid.originalName).name + ' / ' + image(it.node.fluid.originalName).price + ' / ' + image(it.node.fluid.originalName).size:null}</small>
                    :  
                      <small>{image(it.node.fluid.originalName)?image(it.node.fluid.originalName).name:null}</small>
                    }  
                    </div>
                )}
              </div>
            )
          }}
        />
      )
  }
  

