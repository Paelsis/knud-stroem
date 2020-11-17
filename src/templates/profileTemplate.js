import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import imagesJson from '../../src/images/images.json'
import imagesJsonKnud from '../../src/images/images_KNUD.json'

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
      const [arr, setArr] = useState(imagesJson)
      const [json, setJson] = useState(undefined)
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


            const findKnudName = (originalName) => {
              const objFound  = imagesJsonKnud.find(it => it[originalName]?true:false)
              return(objFound?objFound[originalName]:originalName)
            }
            const handleChange = (e, index) => {
              const newArr = data.allImageSharp.edges.map((it, ix) => {
                if (index === ix) {
                  // console.log('type:', e.target.type, 'checked:', e.target.checked, 'value:', e.target.value)
                  if (e.target.type === 'checkbox') {
                    return(arr[ix]?{...arr[ix], [e.target.name]:e.target.checked}:{[e.target.name]:e.target.checked})            
                  } else {
                    return(arr[ix]?{...arr[ix], [e.target.name]:e.target.value}:{[e.target.name]:e.target.value})            
                  }  
                } else {
                  return arr[ix]?arr[ix]:{}
                }
              })
              setArr(newArr)

              // const json = newArr.map(it => ({...it, name:findKnudName(it.originalName)}))
              // setJson(newArr)
            }   
                        
            const handleSubmit = () => {
              alert("Fine")
            }

            const name = (it) => {
              const originalName = it.node.fluid.originalName.split('.')[0]
              const found = imagesJson.find(im => im.originalName === originalName)
              return found?found.name:originalName
            }
            const value = (it, key) => {
              const originalName = it.node.fluid.originalName.split('.')[0]
              const found = arr.find(im => im.originalName === originalName)
              return found?found[key]:''
            }
            return (
              <div>
              <a href={"mailto:paelsis@hotmail.com?subject=Bildere&body=" + JSON.stringify(arr, null, "\t")}>
                <button className="button" style={{backgroundColor:'orange', color:'white'}} >Sänd ditt formulär till Per</button>
              </a>
              <p />
              <form onSubmit={handleSubmit}>
                <div className="columns is-multiline" >
                  {data.allImageSharp.edges.map((it, index)=>
                    <div className="column is-4 columns is-multiline">
                        <div className="column is-full">
                          <Img fluid={it.node.fluid} backgroundColor={backgroundColor} style={{cursor:'pointer'}} />
                        </div>  
                          <div className="column is-full">
                            <label>File: 
                              {value(it, 'originalName') + '.jpg'}
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Name:
                              <input type="text" placeholder={"Ex:" +  value(it, 'name')} name = {'name'} value = {value(it, 'name')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Price:
                            <input type="text" placeholder={'Ex: 100 SEK / 10 EUR / 12 USD'} name = {'price'} value = {value(it, 'price')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Size:
                              <input type="text" placeholder={'Example: 100cm x 50cm'} name = {'size'} value = {value(it, 'size')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Show on homepage:
                              <input type="checkbox" placeholder={'Example: 100cm x 50cm'} name = {'showOnHomepage'} value = {value(it, 'showOnHomepage')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Sequence number:
                              <input type="number" placeholder={0} style={{width:40}} name = {'sequenceNumber'} value = {value(it, 'sequenceNumber')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>


                          <div className="column is-full">
                            <textarea placeholder="Description of image ..." name="desc" value={arr[index]?arr[index]['desc']:''} style={{height:'170px'}} onChange={handleChange}></textarea>
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
  

