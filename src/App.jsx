import React from 'react'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/Home'

const App = () => {
  return (
    <>
    
    
    <BrowserRouter>
    
      <Routes>
        <Route path={"/"} element={<Navigate to="/login"/>} />
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/signup"} element={<Signup/>} />
        <Route path={"/home"} element={<Home/>} />
    
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
