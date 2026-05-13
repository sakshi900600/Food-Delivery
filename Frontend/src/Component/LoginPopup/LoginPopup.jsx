import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(data => ({ ...data, [name]: value }))
    setError("")
  }

  const onLogin = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      setError("")
      const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register"
      const response = await axios.post(url + endpoint, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      } else {
        setError(response.data.message || "Authentication failed")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {currState !== 'Login' &&
            <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required disabled={loading} />
          }
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required disabled={loading} />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required disabled={loading} />
        </div>

        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}

        <button type='submit' disabled={loading} className={loading ? 'loading' : ''}>
          {loading ? (
            <span className="button-loading">
              <span className="spinner-mini"></span> Processing...
            </span>
          ) : (
            currState === 'Sign Up' ? "Create account" : "Login"
          )}
        </button>

        {/* Only show T&C checkbox on Sign Up */}
        {currState === 'Sign Up' && (
          <div className="login-popup-condition">
            <input type="checkbox" required disabled={loading} />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

        {currState === 'Login'
          ? <p>New here? <span onClick={() => !loading && setCurrState('Sign Up')}>Create account</span></p>
          : <p>Already have an account? <span onClick={() => !loading && setCurrState('Login')}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup