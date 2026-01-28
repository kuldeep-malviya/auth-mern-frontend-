import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils/utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const navigate = useNavigate()
  const [loggedInUser,setLoggedInUser ] = useState()
  const [products,setProducts ] = useState()
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem("loggedInUser"))
  },[])

  const handleLogOut = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("logOut successfully")
    setTimeout(()=>{
      navigate("/login")
    },1000)
  }
  const fetchProducts = async () => {
    const url = "http://localhost:4000/products"
    const headers = {
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }
    const response = await fetch(url,headers)
    const result = await response.json()
    setProducts(result)
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (

    <div>

      <h1>welcome:{loggedInUser}</h1>

      {products && products?.map((product,index)=>(
        <ul key={index}><li>{product.name}:{product.price}</li></ul>
      ))}
      <button onClick={handleLogOut}>logOut</button>
      <ToastContainer/>
    </div>
  )
}

export default Home