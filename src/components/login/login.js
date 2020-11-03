import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    handleLogin(this.state)
  }
  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }
    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={e => {
            this.handleSubmit(e)
            navigate(`/app/profile`)
          }}
        >
          <label>
            Username
            <input type="text" name="username" onChange={this.handleChange} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}
export default Login