import React, { useEffect, useRef } from 'react'
import './Header.css'

const DISHES = [
  { emoji: "🍛", name: "Butter Chicken" },
  { emoji: "🫓", name: "Garlic Naan" },
  { emoji: "🥗", name: "Fresh Salads" },
  { emoji: "🍜", name: "Noodles" },
  { emoji: "🎂", name: "Desserts" },
  { emoji: "🥪", name: "Sandwiches" },
]

const Header = () => {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    const speed = 0.4
    const step = () => {
      pos -= speed
      const half = track.scrollWidth / 2
      if (Math.abs(pos) >= half) pos = 0
      track.style.transform = `translateX(${pos}px)`
      requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className='header'>
      {/* floating blobs */}
      <span className='blob blob-1' aria-hidden='true' />
      <span className='blob blob-2' aria-hidden='true' />

      <div className='header-inner'>
        {/* left — text */}
        <div className='header-text'>
          <div className='header-badge'>🔥 Free delivery on first order</div>
          <h1>
            Cravings<br />
            <span className='accent'>Delivered</span><br />
            in 30 mins
          </h1>
          <p>
            From sizzling mains to sweet endings — freshly made,
            lightning fast, right at your door.
          </p>
          <div className='header-actions'>
            <a href='#explore-menu' className='btn-primary'>Browse Menu</a>
            <a href='#app-download' className='btn-ghost'>Get the App</a>
          </div>
          <div className='header-stats'>
            <div className='stat'><strong>50+</strong><span>Dishes</span></div>
            <div className='stat-divider' />
            <div className='stat'><strong>4.9★</strong><span>Rating</span></div>
            <div className='stat-divider' />
            <div className='stat'><strong>30 min</strong><span>Avg. delivery</span></div>
          </div>
        </div>

        {/* right — hero image */}
        <div className='header-visual'>
          <div className='hero-plate-ring'>
            <img
              src='/header_image.png'
              alt='Delicious food spread'
              className='hero-img'
            />
          </div>
          {/* floating chips */}
          <div className='chip chip-1'>🚀 Fast delivery</div>
          <div className='chip chip-2'>🌿 Fresh daily</div>
          <div className='chip chip-3'>⭐ Top rated</div>
        </div>
      </div>

      {/* scrolling dish ticker */}
      <div className='ticker' aria-hidden='true'>
        <div className='ticker-track' ref={trackRef}>
          {[...DISHES, ...DISHES].map((d, i) => (
            <span key={i} className='ticker-item'>
              <span className='ticker-emoji'>{d.emoji}</span>{d.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Header