import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PROMO_CODES = {
  "NAANSTOP10": 0.10,
  "WELCOME20": 0.20,
  "FLAT50": null, // flat ₹50
}

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext)
  const navigate = useNavigate()

  const [promoInput, setPromoInput] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState("")
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const subtotal = getTotalCartAmount()
  const delivery = subtotal === 0 ? 0 : 2

  const getDiscount = () => {
    if (!appliedPromo) return 0
    if (appliedPromo === "FLAT50") return Math.min(50, subtotal)
    return Math.round(subtotal * PROMO_CODES[appliedPromo])
  }

  const discount = getDiscount()
  const total = subtotal === 0 ? 0 : subtotal + delivery - discount

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES.hasOwnProperty(code)) {
      setAppliedPromo(code)
      setPromoError("")
    } else {
      setAppliedPromo(null)
      setPromoError("Invalid promo code.")
    }
  }

  const cartHasItems = food_list.some(item => cartItems[item._id] > 0)

  const handleCheckout = () => {
    if (!token) {
      setShowLoginPrompt(true)
      return
    }
    navigate('/order')
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {!cartHasItems && (
          <p style={{ textAlign: 'center', padding: '30px', color: '#888' }}>Your cart is empty.</p>
        )}

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/image/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>✕</p>
                </div>
                <hr />
              </div>
            )
          }
          return null
        })}

        {cartHasItems && (
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{subtotal}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{delivery}</p>
                </div>
                {discount > 0 && (
                  <>
                    <hr />
                    <div className="cart-total-details" style={{ color: 'green' }}>
                      <p>Discount ({appliedPromo})</p>
                      <p>-₹{discount}</p>
                    </div>
                  </>
                )}
                <hr />
                <div className="cart-total-details">
                  <p><b>Total</b></p>
                  <p><b>₹{total}</b></p>
                </div>
                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
              </div>
            </div>

            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, enter it here</p>
                {appliedPromo && (
                  <p style={{ color: 'green', fontSize: '13px', marginTop: '6px' }}>
                    ✓ Code <b>{appliedPromo}</b> applied! You save ₹{discount}
                  </p>
                )}
                <div className="cart-promocode-input">
                  <input
                    type="text"
                    placeholder='e.g. NAANSTOP10'
                    value={promoInput}
                    onChange={e => { setPromoInput(e.target.value); setPromoError("") }}
                    disabled={!!appliedPromo}
                  />
                  {appliedPromo
                    ? <button onClick={() => { setAppliedPromo(null); setPromoInput("") }} style={{ background: '#888' }}>Remove</button>
                    : <button onClick={applyPromo}>Apply</button>
                  }
                </div>
                {promoError && <p style={{ color: 'red', fontSize: '12px', marginTop: '6px' }}>{promoError}</p>}
                <p style={{ fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Try: NAANSTOP10, WELCOME20, FLAT50</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="cart-login-prompt-overlay">
          <div className="cart-login-prompt">
            <div className="login-prompt-header">
              <h2>Sign In Required</h2>
              <button 
                className="close-btn" 
                onClick={() => setShowLoginPrompt(false)}
              >
                ✕
              </button>
            </div>
            <div className="login-prompt-body">
              <p>You need to sign in to your account to proceed with checkout.</p>
              <p className="secondary-text">Log in to track your orders and manage your account.</p>
            </div>
            <div className="login-prompt-actions">
              <button 
                className="btn-primary"
                onClick={() => {
                  setShowLoginPrompt(false)
                  // Trigger login popup by scrolling to navbar or dispatching event
                  const loginEvent = new CustomEvent('openLoginPopup')
                  window.dispatchEvent(loginEvent)
                }}
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart