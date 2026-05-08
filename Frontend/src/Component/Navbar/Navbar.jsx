import React, { useState, useContext, useRef, useEffect } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const { getTotalCartAmount, token, setToken, food_list, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  const handleSearch = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    if (q.trim().length > 0) {
      const results = food_list.filter(item =>
        item.name.toLowerCase().includes(q.toLowerCase()) ||
        item.category.toLowerCase().includes(q.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
        setSearchQuery("")
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const goToItem = (item) => {
    setSearchOpen(false)
    setSearchQuery("")
    setSearchResults([])
    navigate('/')
    setTimeout(() => {
      document.getElementById('explore-menu')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <div className="logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3F-aGyP3YeeKHHrz0TY-Y2AKSAguHtWkBNA&s" alt="Logo" />
          <span>NaanStop</span>
        </div>
      </Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>

      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search-wrapper" ref={searchRef}>
          <img
            src={assets.search_icon}
            alt="search"
            className="search-icon-btn"
            onClick={() => setSearchOpen(prev => !prev)}
          />
          {searchOpen && (
            <div className="search-dropdown">
              <input
                autoFocus
                type="text"
                placeholder="Search food or category..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              {searchResults.length > 0 && (
                <ul className="search-results">
                  {searchResults.map(item => (
                    <li key={item._id} onClick={() => goToItem(item)} className="search-result-item">
                      <img src={`${url}/image/${item.image}`} alt={item.name} />
                      <div>
                        <p className="result-name">{item.name}</p>
                        <p className="result-category">{item.category} · ${item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {searchQuery.length > 0 && searchResults.length === 0 && (
                <p className="search-no-results">No items found for "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token
          ? <button onClick={() => setShowLogin(true)}>Sign in</button>
          : <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar