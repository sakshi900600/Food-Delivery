import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
            {/* Replaced image with text-based logo */}
            <div className="footer-logo">
               <span>NaanStop</span>
            </div>
            <p>Bringing the best flavors to your doorstep. Experience the speed and taste of NaanStop delivery, where quality meets convenience.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>

        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@naanstop.com</li>
            </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">Copyright 2026 © NaanStop.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer