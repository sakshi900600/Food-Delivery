import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
      <div className="logo">
        <div className="logo-brand">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3F-aGyP3YeeKHHrz0TY-Y2AKSAguHtWkBNA&s" alt="Logo" />
          <span>NaanStop Admin</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        
        <button onClick={onLogout} style={{
          padding: '8px 16px',
          background: '#ff6347',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar