import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { Link } from 'gatsby'
import { getTagLinks } from '../../helpers'
import Logo from '../../components/Logo/Logo'
import { InstagramIcon, YouTubeIcon } from '../../components/Icons'
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

  const socialMediaLinks = [
    {
      href: 'https://www.youtube.com/channel/UCgvXCOU2arITA586vGUbiSg',
      alt: 'YouTube',
      Icon: YouTubeIcon,
    },
    {
      href: 'https://www.instagram.com/mashaclimbing/',
      alt: 'Instagram',
      Icon: InstagramIcon,
    },
  ]

  return (
    <div {...bem()}>
      <div className="wrapper wrapper--wide">
        <div {...bem('inner')}>
          <Logo />
          <div {...bem('navigation')}>
            <ul {...bem('list')}>
              {links.map((link, index) => (
                <li key={index} {...bem('list-item')}>
                  <Link to={link.href} {...bem('link', { active: link.isActive })}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul {...bem('list')}>
              {socialMediaLinks.map((link, index) => {
                return (
                  <li key={index} {...bem('list-item')}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...bem('icon-link')}
                      title={link.alt}
                    >
                      <link.Icon {...bem('icon')} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
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
