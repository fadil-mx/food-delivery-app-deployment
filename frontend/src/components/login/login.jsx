import React, { useContext, useState} from 'react'
import './login.css'    
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { storeContext } from '../../context/storeContext'
import axios from "axios"

const login = ({setShowlogin}) => {
  const {url,token,settoken}=useContext(storeContext)

const [currentstate, setCurrentstate] = React.useState("login")
const [data,setdata]=useState({
  name:"",
  email:"", 
  password:""
})

const changehandler=(e)=>{  
  const {name,value}=e.target
  setdata((prev)=>{return(
    {...prev,[name]:value}
  )}  )
}

const onlogin=async(e)=>{
  e.preventDefault();
  let newurl=url;
try{
  if(currentstate==="login"){
  newurl+="/api/user/login"
  }else{
    newurl+="/api/user/register"
  }
  const response=await axios.post(newurl,data)
  if(response.data.success){
    settoken(response.data.token) ;
    localStorage.setItem("token",response.data.token)


    setShowlogin(false);
  }else{
    alert(response.data.message)
  }
}catch(error){
  console.error(error);
  alert("Something went wrong");
}
}

// useEffect(()=>{console.log(data);},[data])

  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentstate}</h2>
          <img src={assets.cross_icon} alt="cross" onClick={()=> setShowlogin(false)}/>
        </div>

        <div className="login-popup-inputs">
          {currentstate==="sign up"?<input type="text" onChange={changehandler} name='name' placeholder="Your name" required />:null}
        <input type="email" placeholder="Your email" onChange={changehandler} name='email' required />
        <input type="password" placeholder="Password" onChange={changehandler}name="password"  required />
        </div>

        <button  type='submit'>{currentstate==="sign up"?"Create account":"login"}</button>
        
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By countinuing,i agree to the terms and condition. </p>
        </div>

        {currentstate==="login"?
        <p>create a new account?<span onClick={()=>setCurrentstate("sign up")}>Click here</span></p>:
        <p>already has a account <span onClick={()=>setCurrentstate("login")}>login here </span></p>}
      </form>
    </div>
  )
}

export default login


