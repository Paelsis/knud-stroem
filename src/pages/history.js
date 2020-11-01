import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TEXTS = {
  ICELIFTER:
  [{
    header:"THE PAINTER",
    year:2020,
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.\
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of \
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    header:"THE TANGO DANCER",
    year:2020,
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.\
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of \
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    header:"THE CHEF",
    year:2020,
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.\
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of \
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }]
}

const src = `https://source.unsplash.com/random/600x600`  
const bblack = '#2b2523'


export default () => {
  const [hover, setHover] = useState({})
  const Hline = ({header, year}) =>
    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
      <div style={{float:'left', marginTop:'auto', fontSize:20}}>{header}</div>
      <div style={{float:'right', marginTop:'auto', fontSize:10}}>{year}</div>
    </div>
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})

  return (
    <Layout>
      <SEO title="History" />
      <div>
        {TEXTS.ICELIFTER.map(it =>
          <div>
            <div className="columns">
              <div style={{backgroundColor:hover['div1']?bblack:undefined, transition:'2000ms all ease'}} 
                className="column is-one-fifth is-offset-1" 
                onMouseEnter={()=>handleMouseEnter('div1')}
                onMouseLeave={()=>handleMouseLeave('div1')}
              >
                <img src={src} alt={'Image'} style={{opacity:hover['div1']?0.5:1.0,  padding:0, transition:'2000ms all ease'}} />
              </div>
              <div 
                className="column is-5 is-offset-2"
                onMouseEnter={()=>handleMouseEnter('div2')}
                onMouseLeave={()=>handleMouseLeave('div2')}
              >
                <Hline header={it.header} year={it.year} />
                <hr style = {{width:'100%', backgroundColor:'lightBlue', height:'2px'}}/>
                <p>
                  {it.text}
                </p>
              </div>
            </div>
            <div style={{color:'white', height:20}} />            
          </div>
        )}
      </div>
      <Link to="/">Go back  the homepage</Link>
    </Layout>
  )
}  


