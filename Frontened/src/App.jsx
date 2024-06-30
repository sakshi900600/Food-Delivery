import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './Component/Footer/Footer'
import LoginPopup from './Component/LoginPopup/LoginPopup'
import { useState } from 'react'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin? <LoginPopup setShowLogin={setShowLogin}/>: <></>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
        </Routes>
      </div> 
      <Footer/>
    </>
  )
}

export default App
