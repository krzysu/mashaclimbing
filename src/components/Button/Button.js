import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import Link from 'gatsby-link'
import './Button.scss'

const bem = new BEMHelper('button')

const Button = ({
  children,
  style,
  href,
  external,
  className,
  styleObject,
  icon,
}) => {
  const buttonProps = {
    className,
    style: styleObject,
    ...bem(
      '',
      {
        alt: style === 'alt',
        'with-icon': !!icon,
      },
      {
        [`icon-${icon}`]: !!icon,
      }
    ),
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
  style: PropTypes.oneOf(['alt']),
  href: PropTypes.string,
  external: PropTypes.bool,
  className: PropTypes.string,
  styleObject: PropTypes.object,
  icon: PropTypes.string,
}

export default Button
