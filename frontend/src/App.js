import React,{useState} from 'react';
import axios from 'axios'

function App() {
  const [reguser,setRegUser] = useState("")
  const [regpassword,setRegPassword] = useState("")
  const [loguser,setLogUser] = useState("")
  const [logpassword,setLogPassword] = useState("")
  const [name,setName] = useState("")
  const [date,setDate] = useState("")
  const [login,setLogin]=useState(false)
  const [data,setData]=useState(true)
  const Register = () => {
    if(validate()){
      axios.post("http://127.0.0.1:3001/register" , //127.0.0.1:2000 (localhost)
      {
          User : reguser,
          Password : regpassword
      }).then((res)=>{
          console.log(res)
          localStorage.setItem("token",res.data.token)
      }).catch((err)=>{
          console.log(err)
      })
    }
  }
  const Login = () => {
    axios.post("http://127.0.0.1:3001/login" , //127.0.0.1:2000 (localhost)
    {
        User : loguser,
        Password : regpassword
    }).then((res)=>{
        if(res.data.auth) setLogin(true)
        else console.log("Invalid credentials")
    }).catch((err)=>{
        console.log(err)
    })
  }
  const Add = () => {
    axios.post("http://127.0.0.1:3001/add" , //127.0.0.1:2000 (localhost)
    {
        Name : name,
        Date : date
    }).then((res)=>{
       console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
  }
  const Get = () => {
    axios.get("http://127.0.0.1:3001/get") //127.0.0.1:2000 (localhost)
    .then((res)=>{
       console.log(res)
       setData(JSON.stringify(res.data))
    }).catch((err)=>{
        console.log(err)
    })
  }
  const validate = () => {
    if(logpassword==="" || loguser==="")return false
    if(regpassword==="" || reguser==="")return false
    return true;
  }
  return (
    <>
    {!login?
    <div>
            <label><h1>Register</h1><br/> </label>
            <label>username <br/> </label>
            <input type="text" onChange={(event)=>{setRegUser(event.target.value)}}/>
            <br/>
            <label>Password <br/> </label>
            <input type="password" onChange={(event)=>{setRegPassword(event.target.value)}}/>
            <br/>
            <button onClick={Register}>Register</button>
            <br/>
            <label><h1>Login</h1><br/> </label>
            <label>username <br/> </label>
            <input type="text" onChange={(event)=>{setLogUser(event.target.value)}}/>
            <br/>
            <label>Password <br/> </label>
            <input type="password" onChange={(event)=>{setLogPassword(event.target.value)}}/>
            <br/>
            <button onClick={Login}>Login</button>
            <br/>
    </div>
    :
    <div>
            <label><h1>Add Event</h1><br/> </label>
            <label>Event Name<br/> </label>
            <input type="text" onChange={(event)=>{setName(event.target.value)}}/>
            <br/>
            <label>Event date<br/> </label>
            <input type="text" onChange={(event)=>{setDate(event.target.value)}}/>
            <br/>
            <button onClick={Add}>Add</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={Get}>Show data</button><br/>
            {data}
    </div>}
    </>
  );
}

export default App;
