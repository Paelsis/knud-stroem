import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"


export default () => {

  const [values, setValues] = useState({})
  
  const Hline = ({header, year}) =>
    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
      <div style={{float:'left', marginTop:'auto', fontSize:20}}>{header}</div>
      <div style={{float:'right', marginTop:'auto', fontSize:10}}>{year}</div>
    </div>

  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value});
  }

  const body = (values) => 
  <table>
    {Object.entries(values).map(it =>
    <tr>
      <td>{it[0]}</td>
      <td>{it[1]}</td>
    </tr>
    )}
  </table>

  const handleSubmit = (event) => {
    alert('Test of handle submit');
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
  const href = 'mailto:"mailto:knud55@outlook.com?subject=Från min hemsida av ' + values.firstname + ' ' + values.lastname + "&body=" + values.subject + '"'
 

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Please contact me</h1>
      <div className='columns'>

        <div className='column is-half'>
        <img src={src} alt={"profilbild"}/>  
        </div>  
        <div className="column">
          <form action="/action_page.php" onSubmit={handleSubmit}>
            <label for="fname">First Name</label>&nbsp;
            <input id="fname" type="text" name="firstname" value={values.firstname} style={styles.text} placeholder="Your name ..." onChange={handleChange}/>
            <p/>
            <label for="lname">Last Name:</label>&nbsp;
            <input id="lname" type="text" name="lastname" value={values.lastname} style={styles.text} placeholder="Your last name ..." onChange={handleChange}/>
            <p/>
            <label for="country">Country:</label>&nbsp;
            <select id="country" defaultValue="canada" name="country" style={styles.text} onChange={handleChange}>
              <option value="sweden">Sweden</option>
              <option value="netherlands">Netherlands</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
            </select>
            <p/>
            <label for="subject">Subject:</label>&nbsp;
            <textarea id="subject" name="subject" placeholder="Write something ..." value={values.subject} style={{...styles.text, height:'170px'}} onChange={handleChange}></textarea>
            <p/>
            &nbsp;
            <a href={href}>
              Send mail to me
            </a>
          </form>
        </div>
      </div>
  
  
      <Link to="/">Go back  the homepage</Link>
    </Layout>
  )
}  


