import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Login.css'

const Login = ({ url, setToken }) => {
  const [data, setData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${url}/api/admin/login`, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('adminToken', response.data.token)
        toast.success('Logged in successfully')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Login failed. Check your connection.')
    }
    setLoading(false)
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2>Admin Login</h2>
        <form onSubmit={onSubmitHandler} className='login-form'>
          <div className='login-field'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='admin@naanstop.com'
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className='login-field'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter password'
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login