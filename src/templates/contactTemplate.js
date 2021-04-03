import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import variables from "../components/layout.scss";

const email = "knud55@outlook.com"
const subject = "Mail from knud-strom.netlify.app"
const body="Hello Knud Strøm !"

const getMailtoHref = (email, subject, body) => {
    return 'mailto:' + email + `?subject=` + subject + '&body=' + body
}

export default () => {
  const [values, setValues] = useState({})
  const [linkColor, setLinkColor] = useState('blue')
  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  const styles = {
  submit: {
    color: "white",
    backgroundColor: "#4CAF50",
    padding: "12px 20px",
    border: 'none',
    cursor: 'pointer',
  },
  text: {
    width: '100%',
    padding: '6px',
    border: '1px solid #ccc',
    marginTop: '4px',
    marginBottom: '14px',
    resize: 'vertical'
  }
  }

  const src = `https://source.unsplash.com/random/600x600`  
  const href = getMailtoHref (email, subject, body)

  const formFunction = () =>
    <form onSubmit={handleSubmit}>
      <label for="fname">First Name</label>&nbsp;
      <input id="fname" type="text" name="firstname" value={values.firstname} style={styles.text} placeholder="Your name ..." onChange={handleChange}/>
      <p/>
      <label for="lname">Last Name:</label>&nbsp;
      <input id="lname" type="text" name="lastname" value={values.lastname} style={styles.text} placeholder="Your last name ..." onChange={handleChange}/>
      <label for="subject">Subject:</label>&nbsp;
      <textarea id="subject" name="subject" placeholder="Write something ..." value={values.subject} style={{...styles.text, height:'170px'}} onChange={handleChange}></textarea>
      <p/>
      &nbsp;
          <a href={href}>
          <button>Send mail to me</button>
          </a>
  </form>


  return(
      <StaticQuery
          query={graphql`
          {
            allImageSharp(filter: {fluid: {originalName: {regex: "/knud/"}}}, sort: {order: ASC, fields: resolutions___originalName}) {
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
          const fluid = data.allImageSharp.edges?
                          data.allImageSharp.edges[0]?
                            data.allImageSharp.edges[0].node?
                              data.allImageSharp.edges[0].node.fluid
                            :undefined
                          :undefined
                        :undefined  
          return(
            <>
            <h1 style={{color:variables.obblack}}>Please contact me</h1>
            <div className='columns'>

              <div className='column is-half'>
              {fluid?
              <div  style={{position:'relative'}}>
                <Img fluid={fluid} backgroundColor={"grey"} style={{cursor:'pointer'}} />
                <div style={{position:'absolute', bottom:6, right:8, fontSize:'x-small', color:'white', opacity:0.6}}>Photo:Magnus Jönsson</div>  
              </div>
      
              :null}
              </div>  
              <div className="column">
              Click on the button below to contact me via email
              <p/>
              <a href={href}>
                <button onClick={()=>setLinkColor('purple')} className="button" type="button" style={{cursor:'poiter', backgroundColor:'transparent', color:linkColor, border:'1px solid', borderColor:linkColor}}>Link to email</button>
              </a>
              <p/><p/>
              <div style={{fontSize:'x-small'}}>
                If your email client does open when you click on the button above, please use the e-mail 
                address&nbsp;
                <a style={{color:linkColor, textDecoration:'underline'}} href='mailto:knud55@outlook.com'>knud55@outlook.com</a>
              </div>   
              </div>
            </div>
            </>
           )}}
          />  
  )
}