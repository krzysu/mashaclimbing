import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import Link from 'gatsby-link'
import './Button.scss'

const bem = new BEMHelper('button')

const Button = ({ children, href, external, className, styleObject }) => {
  const buttonProps = {
    style: styleObject,
    ...bem(null, null, className),
  }

  if (external) {
    const externalProps = {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    }

    return (
      <a {...externalProps} {...buttonProps}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} {...buttonProps}>
      {children}
    </Link>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  external: PropTypes.bool,
  className: PropTypes.string,
  styleObject: PropTypes.object,
}

export default Button
