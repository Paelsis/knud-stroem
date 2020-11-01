import React, {useState} from "react"
import { connect } from 'react-redux'
import { graphql, StaticQuery } from "gatsby"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Img from 'gatsby-image'
import imagesJson from '../../images/images.json'


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
  // const checkboxOpen = (ix) => setList([...list.slice(0, ix), {...list[ix], open:list[ix].open?undefined:true}, ...list.slice(ix + 1)])
  const className="column is-one-fifth-mobile is-one-third-tablet is-half-desktop"   
  return(
  <StaticQuery
          query={graphql`
          query {
            allImageSharp {
               edges {
                 node {
                   fluid(maxWidth: 800) {
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
                      <div className={className} onClick={()=>setOpen(ix)}>
                          <Img fluid={im.node.fluid} />
                      </div>  
                    :
                      null  
                    )
                  }
                </div>
                {newList.length > offset?
                  <div className="buttons" >
                      {startIndex!==0?
                        <div className="button is-light" onClick={previous}>
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
              <div className="column is-offset-1">
                <figure>
                  <Img fluid={fluid} />
                  <figcaption className="has-text-dark">
                    <h4>{open.originalName}</h4>
                    {image?image.title?image.title:"No text":"title to image not defined in file images.json"}
                    <p>
                    <small>{TEXTS.HEIGHT[props.language]}:{image.height}&nbsp;{TEXTS.WIDTH[props.language]}:{image.width}&nbsp;{TEXTS.PRICE[props.language]}:{image.price} SEK</small>
                    </p>
                  </figcaption>
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


