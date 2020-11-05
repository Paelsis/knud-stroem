import firebase from "gatsby-plugin-firebase"

export const isBrowser = () => typeof window !== "undefined"

const users = [
    {
        username:'per',
        password:'eskilson',
        name:"Per Eskilson",
        email:"paelsis@hotmail.com"
    },
    {
        username:'pehr',
        password:'rafstedt',
        name:"Pehr Rafstedt",
        email:"pr@raftstedt.se"
    },
]


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}


const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

// Used for firebase  
export const getData = () =>
  isBrowser() && window.localStorage.getItem("gatsbyData")
    ? JSON.parse(window.localStorage.getItem("gatsbyData"))
    : {}

const setData = data =>
  window.localStorage.setItem("gatsbyData", JSON.stringify(data))

export const handleLogin = ({ username, password }) => {
  users.forEach(it => { 
    if (it.username === username && it.password === password) {
        return setUser({
            username: it.username,
            name: it.name,
            email: it.email,
        })
    }    
  })
  return false
}

export const handleLoginFirebase = ({ username, password }) => {
    firebase
      .database()
      .ref("/data")
      .once("value")
      .then(snapshot => {
        setUser(snapshot.val())
      })
    return false
  }
  
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}
export const logout = callback => {
  setUser({})
  callback()
}


