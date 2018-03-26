import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import './Header.scss'

const Header = ({ location }) => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__inner">
          <div>
            <Link to="/" className="header__link">
              Masha Climbing
            </Link>
          </div>
          &nbsp;
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object,
}

export default Header
