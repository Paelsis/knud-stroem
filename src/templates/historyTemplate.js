import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import { connect } from 'react-redux'

const src = `https://source.unsplash.com/random/600x600`  
const bblack = '#2b2523'

export default (props) => {
  const [hover, setHover] = useState({})
  const Hline = ({header, year}) =>
    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
      {header?<div style={{float:'left', marginTop:'auto', fontSize:20}}>{header}</div>:null}
      {year?<div style={{float:'right', marginTop:'auto', fontSize:10}}>{year}</div>:null}
    </div>
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
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
    }
   `}
    render={data => {
      return(
              <div>

                {data.allMarkdownRemark.nodes.filter(it => it.frontmatter.language === props.language).map(it =>
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
                        <Hline header={it.frontmatter.title} year={it.frontmatter.year} />
                        <hr style = {{width:'100%', backgroundColor:'lightBlue', height:'2px'}}/>
                        <div dangerouslySetInnerHTML={{ __html:it.html}} />
                      </div>
                    </div>
                    <div style={{color:'white', height:20}} />            
                  </div>
                )}
              </div>
      )
    }}
    />
  )      
  
}

