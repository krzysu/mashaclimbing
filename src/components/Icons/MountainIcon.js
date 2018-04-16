import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import './Icon.scss'

const bem = new BEMHelper('icon')

const MountainIcon = ({ className }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      {...bem(null, null, className)}
    >
      <path d="M28.728 16.586l-2.828 2.828-5.657-5.657-2.828 2.828 2.828 2.828-2.828 2.828-5.657-5.657-5.657 5.657-2.828-2.828 8.485-8.485 2.828 2.828 5.657-5.656 8.485 8.486z" />
    </svg>
  )
}

MountainIcon.propTypes = {
  className: PropTypes.string,
}

export default MountainIcon
