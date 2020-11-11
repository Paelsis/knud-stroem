import React, {useState} from "react"

const email = "knud55@outlook.com"
const subject = "Från min hemsida"
const body="Hello"

const getMailtoHref = (email, subject, body) => {
    return 'mailto:' + email + `?subject=` + subject + '&body=' + body
}

export default () => {
  const [values, setValues] = useState({})
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

  const src = require('../photos/contact/knud.jpg')

  const bodyPlus = values.firstname?values.firstname:' First name missing'
    + ' ' +  
    values.lastname?values.lastname:' Last name missing' 
  + ' ' +  
    values.subject?values.subject:' No subject'  

  const href = getMailtoHref (email, subject, body + bodyPlus)

  return(
    <>
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
    </>
  )
}
