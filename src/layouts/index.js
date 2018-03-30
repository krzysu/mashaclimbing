import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import 'normalize.css/normalize.css'
import 'stylesheets/styles.scss'

const Template = ({ location, children }) => {
  return (
    <div>
      <Header location={location} />
      <div className="body">{children()}</div>
      <Footer />
    </div>
  )
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
}

export default Template
