import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const { url, setCartItems } = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = localStorage.getItem('pendingOrderId')

      if (!orderId) {
        navigate("/")
        return
      }

      try {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        localStorage.removeItem('pendingOrderId')

        if (response.data.success) {
          setCartItems({})
          navigate("/myorders")
        } else {
          navigate("/cart")
        }
      } catch (error) {
        console.log("Verification Error:", error)
        localStorage.removeItem('pendingOrderId')
        navigate("/cart")
      }
    }

    if (url) verifyPayment()
  }, [url])

  return (
    <div className='verify'>
      <div className="spinner"></div>
      <p>Verifying your payment...</p>
    </div>
  )
}

export default Verify