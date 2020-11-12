import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'



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
      const [arr, setArr] = useState([])
      const [click, handleClick] = useState(undefined) 
      const [size, setSize] = useState(0)
      const [json, setJson] = useState(undefined)
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
            const handleChange = (e, index) => {
              const newArr = data.allImageSharp.edges.map((it, ix) => {
                if (index === ix) {
                  return(arr[ix]?{...arr[ix], [e.target.name]:e.target.value}:{[e.target.name]:e.target.value})            
                } else {
                  return arr[ix]?arr[ix]:{}
                }
              })
              setArr(newArr)
            }      
            const handleSubmit = () => {
              setJson.log("arr", arr)
              alert("Fine")
            }
            const name = (it) => {
              return it.node.fluid.originalName.split('.')[0]
            }
            return (
              <div>

              <a href={"mailto:paelsis@hotmail.com?subject=Bildere&body=" + JSON.stringify(arr, "", "\t")}><button className="button" >Sänd din text till Per</button></a>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="columns is-multiline" >
                  {data.allImageSharp.edges.map((it, index)=>
                  <div className="column is-4 columns is-multiline">
                        <div className="column is-12">
                          <Img fluid={it.node.fluid} backgroundColor={backgroundColor} style={{cursor:'pointer'}} />
                        </div>  
                          <div className="column is-12">
                            <label>Name:
                              <input type="text" placeHolder={"Ex:" +  name(it)} name = {name(it)} value = {arr[index]?arr[index][name(it)]:''} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                         <div className="column is-12">
                          <label>Price:
                          <input type="text" placeHolder={'Ex: 100 SEK / 10 EUR / 12 USD'} name = {'price'} value = {arr[index]?arr[index]['price']:''} onChange={e => handleChange(e, index)} />
                          </label>
                        </div>

                        <div className="column is-12">
                          <label>Size:
                            <input type="text" placeHolder={'Example: 100cm x 50cm'} name = {'size'} value = {arr[index]?arr[index]['size']:''} onChange={e => handleChange(e, index)} />
                          </label>
                        </div>

                        <div className="column is-12">
                          <label>Description:<br/>
                          <textarea placeholder="Write something ..." name="desc" value={arr[index]?arr[index]['desc']:''} style={{height:'170px'}} onChange={handleChange}></textarea>
                          </label>
                        </div>
                    </div>
                    )}
                </div>
              </form>
              </div>
            )
          }}
        />
      )
}
  

