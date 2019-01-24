import React from 'react'
import { Link } from 'gatsby'
import './Logo.scss'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo__circle-outer">
        <div className="logo__circle-middle">
          <div className="logo__circle-inner">
            <div className="logo__copy">Masha Climbing</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
