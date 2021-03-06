import React, {useState, useEffect} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import imagesJson from '../../src/images/images.json'
import OpacityText from '../components/OpacityText'
import {axiosGet, axiosPost} from "../functions/axios"

const backgroundColor="#FF7034"
const REMOTE_FILE='images.json'

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

export default (props) => {
      const [arr, setArr] = useState([])
      const [submit, setSubmit] = useState(0)
      const [buttonColor, setButtonColor] = useState({fetchStatic:'green', fetch:'green', submit:'green'})
      /*
      useEffect(() => {
        axiosGet('/getJsonFromFile', (data) => data.result.length >= imagesJson.length?setArr(data.result):null)
      })
      */
      return (
        <StaticQuery
          query={graphql`
          {
            allImageSharp(sort: {order: ASC, fields: resolutions___originalName}) {
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
              const newArr = arr.map((it, ix) => {
                const originalName = it.node.fluid.originalName.split('.')[0];
                if (index === ix) {
                  return arr[ix]?{...arr[ix], [e.target.name]:e.target.value}:{originalName, [e.target.name]:e.target.value}
                } else {
                  return arr[ix]?{...arr[ix]}:{originalName}
                }  
              })  
              setArr(newArr)
            }

            const sortName = (a, b) => {
              if (a.name===undefined && b.name === undefined) {
                return 0
              } else if (a.name===undefined) {
                return 1
              } else if (b.name===undefined) {
                return -1
              } 
              return a.name.localeCompare(b.name)  
            }  

            const handleFetchStatic = (e) => {
              setButtonColor({...buttonColor, fetchStatic:'pink'})
              const newArr = data.allImageSharp.edges.map(it => {
                const originalName = it.node.fluid.originalName.split('.')[0]
                const jsFound = imagesJson.find(im => im.originalName  === originalName)
                const activeInProfile = (jsFound?jsFound.name?(jsFound.name.length < 7):true:true) && (!(originalName.includes('HISTORY'))) && (!(originalName.includes('knud'))) && (!(originalName.includes('header'))) 
                if (jsFound) {
                  return {...jsFound, node:it.node, activeInProfile}
                } else {
                  return {originalName, node:it.node, activeInProfile}
                } 
              }).sort(sortName)
              setButtonColor({...buttonColor, fetchStatic:'pink'})
              setArr(newArr)  
            }

            const handleFetch = (e) => {
              setButtonColor({...buttonColor, fetch:'pink'})
              axiosGet('/getJsonFromFile?fname=' + REMOTE_FILE, (axiosData) => {
                  console.log('jsonArray:', axiosData.result)
                  const newArr = data.allImageSharp.edges.map(it => {
                      const originalName = it.node.fluid.originalName.split('.')[0]
                      const jsFound = axiosData.result.find(ax => ax.originalName === originalName);
                      const activeInProfile = (jsFound?jsFound.name?(jsFound.name.length < 7):true:true) && (!(originalName.includes('HISTORY'))) && (!(originalName.includes('knud'))) && (!(originalName.includes('header'))) 
                      if (jsFound) {
                        return {...jsFound, node:it.node, activeInProfile}
                      } else {
                        return {originalName, node:it.node, activeInProfile}
                      }     
                  }).sort(sortName)
                  setButtonColor({...buttonColor, fetch:'green'})
                  setArr(newArr)  
              })
            }

            const handleSubmit = (e) => {
              e.preventDefault(e)
              alert('Submit')
              setButtonColor({...buttonColor, submit:'pink'})
              const array = arr.map(it => ({...it, node:undefined, activeInProfile:undefined}))
              console.log('Submit payload, array:', array)
              const payload = {
                fname:REMOTE_FILE,
                array,
              }
              axiosPost('/setJsonInFile', payload, (reply) => {
                setSubmit(submit+1)
                setButtonColor({...buttonColor, submit:'green'})
              })  
            }

           const handleReset = (e) => {
              e.preventDefault()
              setArr([])
            }

            const handleInit = (e) => {
              e.preventDefault()
              setArr([])
            }


            return (
              <div>
                <button className="button" type="button" style={{backgroundColor:'green', color:'white'}} onClick={handleFetchStatic}>Återställ till orginal</button>
                <a href={"mailto:paelsis@hotmail.com?subject=Bildere&body=" + JSON.stringify(arr.map(it => ({...it, node:undefined, activeInProfile:undefined})), null, "\t")}>
                  <button className="button" style={{backgroundColor:'green', color:'white'}} >Skicka ändrade data i mail till Per</button>
                </a>
                <p />   
              <OpacityText title={"KNUDS CHANGES"} text={"HERE KNUD CHANGE THE INFO ABOUT HIS IMAGES AND SEND THEM TO PÄLZ"} />
              <form onSubmit={handleSubmit}>
                <button className="button" type="button" style={{backgroundColor:buttonColor.fetch, color:'white'}} onClick={handleFetch}>Hämta</button>
                <button className="button" type="submit" style={{backgroundColor:buttonColor.submit, color:'white'}} >Spara</button>
                <button className="button" type="reset" disabled style={{backgroundColor:'green', color:'white'}} onClick={handleReset}>Reset</button>
                <p />
                <p />
                <div className="columns is-multiline" >
                  {arr.map((it, index)=>
                        <div className="column is-4 columns is-left is-multiline" style={{opacity:it.activeInProfile?1.0:0.4, fontStyle:it.activeInProfile?'normal':'oblique', fontWeight:it.activeInProfile?'normal':'lighter'}}>
                          <div className={it.activeInProfile?"column is-full":"column is-10 "}>
                            {it.node.fluid?
                              <Img fluid={it.node.fluid} backgroundColor={backgroundColor} style={{cursor:'pointer'}} />
                            :null}
                          </div >  
                            <div className="column is-full">
                              <label>File: 
                                {it.node.fluid.originalName}
                              </label>
                            </div>

                            <div className="column is-full">
                              <label>Name:
                              <input type="text" placeholder={'Ex: YYYY-NNN'} name = {'name'} value = {it.name?it.name:''} onChange={e => handleChange(e, index)} /> 
                              </label>
                            </div>

                            <div className="column is-full">
                              <label>Price:
                              <input type="text" placeholder={'Ex: 100 eur'} name = {'price'} value = {it.price?it.price:''} onChange={e => handleChange(e, index)} />
                              </label>
                            </div>

                            <div className="column is-full">
                              <label>Size:
                                <input type="text" placeholder={'Ex: width x height'} name = {'size'} value = {it.size?it.size:''} onChange={e => handleChange(e, index)} />
                              </label>
                            </div>

                            <div className="column is-full">
                              <label>Photo by:
                                <input type="text" placeholder={'Ex: Magnus Jönsson'} name = {'photo'} value = {it.photo?it.photo:''} onChange={e => handleChange(e, index)} />
                              </label>
                            </div>

                            <div className="column is-full">
                              <label>Show on homepage:
                                <input type="checkbox" name = {'showOnHomepage'} value = {it.showOnHomepage?it.showOnHomepage:''} onChange={e => handleChange(e, index)} />
                              </label>
                            </div>


                            <div className="column is-full">
                              <label>Hide this image:
                                <input type="checkbox" name = {'hidden'} value = {it.checkbox?it.checkbox:''} onChange={e => handleChange(e, index)} />
                              </label>
                            </div>

                            <div className="column is-full">
                              <label>Sequence number:
                                <input type="number" placeholder={0} style={{width:40}} name = {'sequenceNumber'} value = {it.sequence?it.sequence:''} onChange={e => handleChange(e, index)} />
                              </label>
                            </div>

                            <div className="column is-full">
                              <textarea placeholder="Description of image ..." name="desc" value = {it.desc?it.desc:''} style={{height:'170px'}} onChange={e => handleChange(e, index)}></textarea>
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
  

