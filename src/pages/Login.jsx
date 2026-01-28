;import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handelError, handleSuccess } from '../utils/utils'
import axios from "axios"

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=> {
        const {name, value} = e.target;
        console.log(name,value)
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }
    console.log("loginInfo --> ",loginInfo)
    const handleLogin = async (e)=>{
        e.preventDefault()
        const {name ,email, password} = loginInfo
        if(!email || !password){
            return handelError("email, password is required")
        }
        try {
            const url = "https://auth-mern-1-pw6l.onrender.com/auth/login"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-type" :"application/json"
                },
                body:JSON.stringify(loginInfo)
            })
            const result = await response.json()
            const {success,message,jwtToken,name,error} = result
            if(success){
                handleSuccess(message)
                localStorage.setItem("token",jwtToken)
                localStorage.setItem("loggedInUser",name)
                setTimeout(()=>{
                    navigate("/home")
                },1000)
            }
            else if(error){
                const details = error?.details[0].message;
                handelError(details)
            }else if(!success){
                handelError(message)
            }
            console.log(result)
        } catch (err) {
            handelError(err)
        }

    }
  return (
    <div className='container '>

        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          
            <div>
                <label htmlFor="email">email:</label>
        <input autoFocus onChange={handleChange} type="email"  name="email"  placeholder='enter your email'  value={loginInfo.email} />

            </div>
            <div>
        <label htmlFor="password">password:</label>
        <input onChange={handleChange} type="password" name="password" placeholder='enter password'  value={loginInfo.password}  />

            </div>
        <button type="submit">login</button>
        <span>Don't have an account
             <Link to={"/signup"}>signup</Link></span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login
