import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { auto } from "eol"

const TEXTS = {
  title:{
    SV:"KNUD STRØM - FOTO GALLERI !",
    EN:"KNUD STROEM - PHOTO GALLERY !",
  },
  subtitleArray:{
    SV:["Jag målar", "dansar tango"],
    EN:["I paint", "dance tango"],
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


const square = () =>
  <div style={{alignSelf:'left', height:50, width:50, backgroundColor:'#FF7034'}} />


const Header = ({language, title}) => {
  const [hover, setHover] = useState({})
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  return(
    <header 
      className="is-size-1"
      style={{
        marginBottom: `0`,
        clip: "rect(0, 100px, 200px, 0)",
      }}
    >
      <Link
            to="/"
            className='title'
            style={{
              textDecoration: `none`,
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
          opacity:1.0,
          //background:hover['h1']?bblack:undefined,
          transition:'500ms all ease'
        }}
        onMouseEnter={()=>handleMouseEnter('div')}
        onMouseLeave={()=>handleMouseLeave('div')}
      >
        <div>
            <h1 style={{fontSize:32}}>{title[language]}</h1>
        </div>
        <div>
          <SubHeader 
            arr={TEXTS.subtitleArray[language]} style={{padding:0, margin:0, color:"#FF7034"}}
          />
        </div>
      </div>
      </Link>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

export default connect(mapStateToProps)(Header)