import React, {useState} from "react"
import { connect } from 'react-redux'
import { graphql, StaticQuery } from "gatsby"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Img from 'gatsby-image'
import imagesJson from '../images/images.json'

const backgroundColor="#FF7034"

const offset = 10

const styles = {
  root:{
    marginTop:'0.45rem',
  },
  image: (im) =>({
    maxHeight:im.large?'80vh':'65vh',
    transform: im.rotate?'rotate(' + im.rotate + 'deg)':null,
    transition:'500ms all ease'
  }),
}

const TEXTS = {
  HEIGHT:{SV:'Höjd', EN:'Height'},
  WIDTH:{SV:'Bredd', EN:'Width'},
  PRICE:{SV:'Pris', EN:'Price'},

}


const TabletAndUp = (props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(0)
  const [openMobile, setOpenMobile] = useState(undefined)
  const [hover, setHover] = useState({})
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  // const checkboxOpen = (ix) => setList([...list.slice(0, ix), {...list[ix], open:list[ix].open?undefined:true}, ...list.slice(ix + 1)])
  const className="column is-one-fifth-mobile is-one-third-tablet is-half-desktop"   
  return(
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
            const list = data.allImageSharp.edges
            const newList = list.length >0?list.find((it, index) => (index >= startIndex && index < startIndex + offset && it.open))?list
            :[...list.slice(0, startIndex), {...list[startIndex], open:true}, ...list.slice(startIndex + 1)]:[]
            const previous = () => {
              const newStartIndex = Math.max(startIndex-offset, 0)
              setStartIndex(newStartIndex)
              setOpen(newStartIndex)
            }
            const next = () => {
              const newStartIndex = (startIndex + offset <= list.length)?startIndex + offset: startIndex
              setStartIndex(newStartIndex)
              setOpen(newStartIndex)
            }
            const fluid = newList[open].node.fluid
            const originalName = newList[open].node.fluid.originalName
            const image = imagesJson.find(it => it.originalName == originalName)
            return (
              <div style={styles.root} className="columns is-centered">
              <div className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-offset-1-desktop">
                <div className="columns is-centered is-multiline is-mobile">
                  {
                    newList.map((im, ix)=>
                    (ix >= startIndex && ix < startIndex + offset) ?
                      <div className={className} style={{cursor:'pointer'}} onClick={()=>setOpen(ix)} >
                          <Img fluid={im.node.fluid} backgroundColor={backgroundColor} />
                      </div>  
                    :
                      null  
                    )
                  }
                </div>
                {newList.length > offset?
                  <div className="buttons" >
                      {startIndex!==0?
                        <div className="button is-light" onClick={previous} style={{cursor:'pointer'}}>
                          <NavigateBeforeIcon />
                        </div>
                      :
                        null  
                      } 
                      {newList.length - startIndex > offset?
                        <div className="button is-light" onClick={next}>
                          <NavigateNextIcon />
                        </div>
                      :
                        null  
                      }          
                  </div>
                :null}
              </div>
              <div className="column is-offset-1" onMouseEnter={()=>handleMouseEnter('bigPic')} onMouseLeave={()=>handleMouseLeave('bigPic')}>
                <figure>
                  <Img fluid={fluid} backgroundColor={backgroundColor} />
                  {image?
                    <figcaption className="has-text-dark" style={{opacity:!image.hover || hover['bigPic']?1.0:0, transition:'1500ms all ease', fontWeight:100}}>
                      <p style={{fontWeight:100}}>
                        {image.originalName}
                      </p>
                      <small style={{fontWeight:100}}>
                      {image?image.title?image.title:"No text":"title to image not defined in file images.json"}
                      </small>
                      <br />
                      <small style={{fontWeight:100}}>{TEXTS.HEIGHT[props.language]}:{image.height}&nbsp;{TEXTS.WIDTH[props.language]}:{image.width}&nbsp;{TEXTS.PRICE[props.language]}:{image.price} SEK</small>
                    </figcaption>
                  :null}
                </figure>
              </div>
            </div>
        
            )
          }}
        />
)}


// Map the dispatch to onMyClick
const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

export default connect(mapStateToProps)(TabletAndUp)


