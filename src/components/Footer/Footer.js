import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import Link from 'gatsby-link'
import './Footer.scss'

const bem = new BEMHelper('footer')

const Footer = () => {
  const linksLeft = [
    {
      href: 'https://www.youtube.com/channel/UCgvXCOU2arITA586vGUbiSg',
      label: 'YouTube',
    },
    {
      href: 'https://www.instagram.com/mashaclimbing/',
      label: 'Instagram',
    },
  ]

  const linksRight = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/contact/',
      label: 'Contact',
    },
  ]

  return (
    <div {...bem()}>
      <div className="wrapper">
        <div {...bem('menu')}>
          <ul {...bem('list')}>
            {linksLeft.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" {...bem('link')}>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <ul {...bem('list')}>
            {linksRight.map((link, index) => {
              return (
                <li key={index}>
                  <Link to={link.href} {...bem('link')}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <small {...bem('copyright')}>
          {`copyright © ${new Date().getFullYear()} MashaClimbing`}
        </small>
      </div>
    </div>
  )
}

export default Footer
