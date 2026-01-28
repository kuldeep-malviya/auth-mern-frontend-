import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handelError, handleSuccess } from '../utils/utils'
import axios from "axios"

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=> {
        const {name, value} = e.target;
        console.log(name,value)
        const copySignUpInfo = {...signupInfo}
        copySignUpInfo[name] = value;
        setSignupInfo(copySignUpInfo)
    }
    console.log("signupInfo --> ",signupInfo)
    const handleSignup = async (e)=>{
        e.preventDefault()
        const {name ,email, password} = signupInfo
        if(!name|| !email || !password){
            return handelError("name ,email, password is required")
        }
        try {
            const url = "http://localhost:4000/auth/signup"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-type" :"application/json"
                },
                body:JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const {success,message,error} = result
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                    navigate("/login")
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

        <h1>signup</h1>
        <form onSubmit={handleSignup}>
            <div><label htmlFor="name">name:</label>
                <input onChange={handleChange} type="text" placeholder='enter your name' name='name' value={signupInfo.name} />

            </div>
            <div>
                <label htmlFor="email">email:</label>
        <input autoFocus onChange={handleChange} type="email"  name="email"  placeholder='enter your email'  value={signupInfo.email} />

            </div>
            <div>
        <label htmlFor="password">password:</label>
        <input onChange={handleChange} type="password" name="password" placeholder='enter password'  value={signupInfo.password}  />

            </div>
        <button type="submit">SignUp</button>
        <span>already have an account ?
             <Link to={"/login"}>Login</Link></span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup