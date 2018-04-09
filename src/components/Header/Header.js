import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import Link from 'gatsby-link'
import { getTagLinks } from 'helpers'
import Logo from 'components/Logo/Logo'
import './Header.scss'

const bem = new BEMHelper('header')

const Header = ({ pathname, tags }) => {
  const links = [
    {
      label: 'Home',
      href: '/',
      isActive: pathname === '/',
    },
    ...getTagLinks(tags, pathname),
    {
      label: 'Contact',
      href: '/contact/',
      isActive: pathname === '/contact/',
    },
  ]

  return (
    <div {...bem()}>
      <div className="wrapper wrapper--wide">
        <div {...bem('inner')}>
          <Logo />
          <ul {...bem('list')}>
            {links.map((link, index) => (
              <li key={index} {...bem('list-item')}>
                <Link
                  to={link.href}
                  {...bem('link', { active: link.isActive })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  tags: PropTypes.array,
  pathname: PropTypes.string,
}

export default Header
