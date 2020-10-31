import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Img from 'gatsby-image'


const offset = 10

const styles = {
  root:{
    marginTop:'0.45rem',
  },
  thumbnail:(open) => ({
    height:50, 
    border:open?'2px dotted #333':'0px',
    opacity:open?0.5:1.0,
  }),
  image: (im) =>({
    maxHeight:im.large?'80vh':'65vh',
    transform: im.rotate?'rotate(' + im.rotate + 'deg)':null,
    transition:'500ms all ease'
  }),
}


export default ({list}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(0)
  // const checkboxOpen = (ix) => setList([...list.slice(0, ix), {...list[ix], open:list[ix].open?undefined:true}, ...list.slice(ix + 1)])
  const className="column is-one-quarter-mobile is-one-third-tablet is-half-desktop"   
  return(
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
            const originalName = newList[open].node.originalName
            return (
              <div style={styles.root} className="columns is-centered">
              <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-offset-1-desktop">
                <div className="columns is-centered is-multiline is-mobile">
                  {newList.map((im, ix)=>
                    (ix >= startIndex && ix < startIndex + offset) ?
                      <div className="column is-one-third-mobile is-half-desktop" onClick={()=>setOpen(ix)}>
                          <Img fluid={im.node.fluid} />
                      </div>  
                    :null  
                  )}
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
                    <h4>{originalName}</h4>
                    Här kommer text - {originalName}
                  </figcaption>
                </figure>
              </div>
            </div>
        
            )
          }}
        />
)}


