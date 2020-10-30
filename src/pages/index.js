import React, {useState} from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const TEXTS = {
  ICELIFTER:
  [{
    header:"ICELIFTER MAX",
    year:2020,
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.\
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of \
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    header:"ICELIFTER DUMP",
    year:2020,
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.\
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of \
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    header:"ICELIFTER GW",
    year:2020,
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.\
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of \
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }]
}

export default () => {
  
  const [hover, setHover] = useState({})
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  const Hline = ({header, year}) =>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', width:'100%'}}>
      <span style={{float:'left', fontSize:20, marginBottom:-3, paddingBottom:0}}>{header}</span>
      <span style={{float:'right', fontSize:12, marginBottom:0, paddingBottom:0}}>{year}</span>
    </div>
    

  const src = `https://source.unsplash.com/random/400x400`  

  return (
    <Layout>
      <SEO title="Home page" />
      <div>
        {TEXTS.ICELIFTER.map(it =>
          <div>
            <div className="columns">
              <div className="column is-one-fifth is-offset-2"
                  onMouseEnter={()=>handleMouseEnter('div1')}
                  onMouseLeave={()=>handleMouseLeave('div1')}
                  style={{backgroundColor:hover['div1']?'green':'transparent', opacity:hover['div1']?0.4:1.0, transition:'2000ms all ease'}}
              >
                <img src={src} alt="Bild"  
                    style={{backgroundSize:'cover', width:'100%', backgroundColor:hover['div1']?'green':'transparent', transition:'2000ms all ease'}}
                />
              </div>
              <div 
                className="column is-5 is-offset-1"
                onMouseEnter={()=>handleMouseEnter('div2')}
                onMouseLeave={()=>handleMouseLeave('div2')}
                style={{color:hover['div2']?'white':'blue', backgroundColor:hover['div2']?'blue':'transparent', transition:'2000ms all ease'}}
             >
                <Hline header={it.header} year={it.year} />
                <hr style = {{width:'100%', backgroundColor:'purple', height:'2px'}}/>
                <p>
                  {it.text}
                </p>
              </div>
            </div>
            <div style={{color:'white', height:20}} />            
          </div>
        )}
      </div>
    </Layout>
  )
}  


