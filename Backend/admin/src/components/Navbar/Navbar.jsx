import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
          <div className="logo-brand">
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3F-aGyP3YeeKHHrz0TY-Y2AKSAguHtWkBNA&s" alt="Logo" />
             <span>NaanStop</span>
          </div>
      </div>
      <img className='profile' src={assets.profile_icon} alt="Profile" />
    </div>
  )
}

export default Navbar