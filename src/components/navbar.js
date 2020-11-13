import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import {LANGUAGE_EN, LANGUAGE_SV, setLanguage} from '../state/reducers/language'
import {setZoom} from '../state/reducers/zoom'
import { getUser, logout } from "../services/auth"



const TEXTS = {
  HOME:{
    [LANGUAGE_SV]:'Hem',
    [LANGUAGE_EN]:'Home'
  },
  ALL:{
    [LANGUAGE_SV]:'Alla bilder',
    [LANGUAGE_EN]:'All pictures'
  },
  HISTORY:{
    [LANGUAGE_SV]:'Historia',
    [LANGUAGE_EN]:'History'
  },
  LANGUAGE:{
    [LANGUAGE_SV]:"Engelska",
    [LANGUAGE_EN]:"Swedish",
  },
  CONTACT:{
    [LANGUAGE_SV]:'Kontakt',
    [LANGUAGE_EN]:'Contact'
  },
  MY_PROFILE:{
    [LANGUAGE_SV]:'Min Profil',
    [LANGUAGE_EN]:'My Profile'
  },
  LOGOUT:{
    [LANGUAGE_SV]:'Logout',
    [LANGUAGE_EN]:'Logout'
  },
  LOGIN:{
    [LANGUAGE_SV]:'Login',
    [LANGUAGE_EN]:'Login'
  },
  NOT_LOGGED_IN:{
    [LANGUAGE_SV]:'Du är inte inloggad',
    [LANGUAGE_EN]:'You are not logged in'
  },
  MY_PROFILE:{
    [LANGUAGE_SV]:'Min profil',
    [LANGUAGE_EN]:'My profile'
  },
  YOU_ARE_LOGGED_IN:{
    [LANGUAGE_SV]:'Du är inloggad som ',
    [LANGUAGE_EN]:'You logged in as '
  },
  GALLERIES:{
    [LANGUAGE_SV]:'Gallerier',
    [LANGUAGE_EN]:'Galleries'
  },
  OLDER_IMAGES:{
    [LANGUAGE_SV]:'Äldre',
    [LANGUAGE_EN]:'Older'
  },
}

const Func = ({galleries,language, setLanguage, loggedIn}) => {
  const [objActive, setObjActive] = useState({})
  const toggleHamburger = (e) => {
    setObjActive({active:!objActive.active, navBarActiveClass:!objActive.active?'is-active':''})
  }
  const handleClick = () => setLanguage(language===LANGUAGE_EN?LANGUAGE_SV:LANGUAGE_EN)
  const handleLogout = e =>  {
    e.preventDefault()
    logout(() => navigate(`/app/login`))
  }
  const handleLogin = e =>  {
    console.log('Hello there')
    e.preventDefault()
    navigate(`/app/login`)
  }
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
  {loggedIn?
    <div className={`navbar-menu navbar-start`} style={{paddingTop:0, marginTop:-10}}>
      <a className="navbar-item">
        <small>{TEXTS.YOU_ARE_LOGGED_IN[language] +  getUser().displayName}</small>
      </a>    
      <img src={getUser().photoURL} alt="" style={{position:'relative', top:'20%', paddingTop:0, borderRadius:"50%", height:40}} />
    </div>
  :null}
  
  <div id="navbar1" className={`navbar-menu navbar-end ${objActive.navBarActiveClass}`} style={{fontWeight:100, fontSize:14}}>
    <Link to="/" className="navbar-item">
      {TEXTS.HOME[language]}
    </Link>
  
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link is-arrowless">
        {TEXTS.GALLERIES[language]}
      </a>

      <div class="navbar-dropdown">
        {galleries.map(ga =>
        <a class="navbar-item">
          {ga}
        </a>
        )}
        <a class="navbar-item">
          {TEXTS.OLDER_IMAGES[language]}
        </a>
      </div>
    </div>
    <Link to="/images/" className="navbar-item">
      {TEXTS.ALL[language]}
    </Link>
    <Link to="/history/" className="navbar-item">
      {TEXTS.HISTORY[language]}
    </Link>
    <a className="navbar-item" onClick={handleClick}>
      {TEXTS.LANGUAGE[language]}
    </a>
    <Link to="/contact/" className="navbar-item">
      {TEXTS.CONTACT[language]}
    </Link>
    {loggedIn?
      <Link to="/app/profile/" className="navbar-item">
        {TEXTS.MY_PROFILE[language]}
      </Link>
    :null
    }  
    {loggedIn?
      <a className="navbar-item" onClick={handleLogout}>
        {TEXTS.LOGOUT[language]}
      </a>
      :
      <a className="navbar-item" onClick={handleLogin} >
        {TEXTS.LOGIN[language]}
      </a>
    }  
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
      setZoom: (zoom) => {dispatch(setZoom(zoom))},
  }        
}

export default  connect( 
  mapStateToProps,
  mapDispatchToProps,
) (Func);    




