import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MINIMUM_ORDER = 50  // ₹50

const PlaceOrder = () => {
  const { getTotalCartAmount, token, url, food_list, cartItems } = useContext(StoreContext)
  const navigate = useNavigate()

  const subtotal = getTotalCartAmount()
  const delivery = subtotal === 0 ? 0 : 2
  const total = subtotal === 0 ? 0 : subtotal + delivery
  const isBelowMinimum = subtotal > 0 && total < MINIMUM_ORDER

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipcode: "", country: "", phone: ""
  })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    if (isBelowMinimum) return
    setLoading(true)
    setErrorMsg("")

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }))

    try {
      const response = await axios.post(
        url + "/api/order/place",
        { address: data, items: orderItems, amount: total },
        { headers: { token } }
      )

      if (response.data.success) {
        // Save orderId before leaving — Stripe redirect loses React state
        localStorage.setItem('pendingOrderId', response.data.orderId)
        window.location.replace(response.data.session_url)
      } else {
        setErrorMsg(response.data.message || "Error placing order. Please try again.")
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong. Please check your connection and try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) navigate('/cart')
    else if (subtotal === 0) navigate('/')
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details"><p>Subtotal</p><p>₹{subtotal}</p></div>
          <hr />
          <div className="cart-total-details"><p>Delivery Fee</p><p>₹{delivery}</p></div>
          <hr />
          <div className="cart-total-details"><b>Total</b><b>₹{total}</b></div>

          {isBelowMinimum && (
            <div className="order-notice order-notice--warn">
              ⚠️ Minimum order amount is <b>₹{MINIMUM_ORDER}</b>. Your total is ₹{total}. Please add more items.
            </div>
          )}

          {errorMsg && (
            <div className="order-notice order-notice--warn">
              ❌ {errorMsg}
            </div>
          )}

          <div className="order-notice order-notice--info">
            🔒 Payments secured by Stripe. Your card details are never stored.
          </div>

          <button
            type='submit'
            className={`pay-btn ${isBelowMinimum || loading ? 'pay-btn--disabled' : ''}`}
            disabled={isBelowMinimum || loading}
          >
            {loading ? 'Redirecting to payment...' : 'Proceed to Payment →'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder