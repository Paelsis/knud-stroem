import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link } from "gatsby"
import PropTypes from "prop-types"
import {LANGUAGE_EN, LANGUAGE_SV, setLanguage} from '../state/reducers/language'


const TEXTS = {
  HOME:{
    [LANGUAGE_SV]:'Hem',
    [LANGUAGE_EN]:'Home'
  },
  TECHNIQUE:{
    [LANGUAGE_SV]:'Tekniken',
    [LANGUAGE_EN]:'Technique'
  },
  LANGUAGE:{
    [LANGUAGE_SV]:"Engelska",
    [LANGUAGE_EN]:"Swedish",
  },
  CONTACT:{
    [LANGUAGE_SV]:'Kontakt',
    [LANGUAGE_EN]:'Contact'
  }
}

const Func = ({language, setLanguage}) => {
  const [objActive, setObjActive] = useState({})
  const toggleHamburger = (e) => {
    setObjActive({active:!objActive.active, navBarActiveClass:!objActive.active?'is-active':''})
  }
  const handleClick = () => setLanguage(language===LANGUAGE_EN?LANGUAGE_SV:LANGUAGE_EN)
return(
<nav class="navbar is-size-4-mobile is-size-6" role="navigation" aria-label="main navigation">
  <div
    className={`navbar-burger burger ${objActive.navBarActiveClass}`}
    data-target="navMenu"
    onClick={e => toggleHamburger(e)}
  >
    <span />
    <span />
    <span />
  </div>

  <div id="navbarBasicExample" className={`navbar-menu  navbar-end ${objActive.navBarActiveClass}`}>
    <Link to="/" className="navbar-item">
      {TEXTS.HOME[language]}
    </Link>
    <Link to="/technique/" className="navbar-item">
      {TEXTS.TECHNIQUE[language]}
    </Link>
    <a className="navbar-item" onClick={handleClick}>
      {TEXTS.LANGUAGE[language]}
    </a>
    <Link to="/contact/" className="navbar-item">
      {TEXTS.CONTACT[language]}
    </Link>
  </div>
</nav>
)}

const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      setLanguage: (language) => {dispatch(setLanguage(language))},
  }        
}

export default  connect( 
  mapStateToProps,
  mapDispatchToProps,
) (Func);    




