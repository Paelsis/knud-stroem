import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Navbar from "./navbar"
import { auto } from "eol"

const TEXTS = {
  title:{
    SV:"KNUD STRØM - FOTO GALLERI !",
    EN:"KNUD STROEM - PHOTO GALLERY !",
  },
  subtitleArray:{
    SV:["Jag målar", "dansar tango", "lagar mat"],
    EN:["I paint", "dance tango", "and cook"],
  }
}

const bblack = '#2b2523'

const SubHeader = ({arr, style}) => 
  <h4 style={{...style, color:'white'}}>
    {arr.map((it,index) =>  
      <span>
        {index>0?<span style={{color:'red', ...style}}>&nbsp;&bull;&nbsp;</span>:null}
        <span>{it}</span>
      </span>
    )}
  </h4>

const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

const square = () =>
  <div style={{alignSelf:'left', height:50, width:50, backgroundColor:'#FF7034'}} />


export default connect(mapStateToProps)(({language, siteTitle, hoverTitle}) => {
  const [hover, setHover] = useState({})
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  return(
    <header 
      className="is-size-1"
      style={{
        marginBottom: `1.45rem`,
    }}
    >
      <div 
          style={{
          display:'flex',  
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          height:150,
          padding: `1.45rem`,
          opacity:hover['div']?0.5:1.0,
          //background:hover['h1']?bblack:undefined,
          transition:'500ms all ease'
        }}
        onMouseEnter={()=>handleMouseEnter('div')}
        onMouseLeave={()=>handleMouseLeave('div')}
      >
        <div>
          <Link
            to="/"
            className='title'
            style={{
              textDecoration: `none`,
            }}
          >
            <h1 style={{fontSize:32}}>{TEXTS.title[language]}</h1>
          </Link>
        </div>
        <div>
          <SubHeader 
            arr={TEXTS.subtitleArray[language]} style={{padding:0, margin:0, color:"#FF7034"}}
          />
        </div>
      </div>
      <Navbar />
    </header>

    )

})