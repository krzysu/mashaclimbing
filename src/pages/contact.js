import React from 'react'
import PropTypes from 'prop-types'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import { getEmail } from 'helpers'
import './contact.scss'

const ContactPage = () => {
  const links = [
    {
      label: 'Write me a message to',
      href: `mailto:${getEmail()}`,
      value: getEmail(),
    },
    {
      label: 'Watch my videos & subscribe to my channel on',
      href: 'https://www.youtube.com/channel/UCgvXCOU2arITA586vGUbiSg',
      value: 'YouTube',
    },
    {
      label: 'Follow me & like my photos on',
      href: 'https://www.instagram.com/mashaclimbing/',
      value: 'Instagram',
    },
  ]

  return (
    <div className="contact-page">
      <div className="wrapper">
        <div className="contact-page__content">
          <h1>Contact</h1>
          <ul>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <span>{link.label}</span>{' '}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-page__link"
                  >
                    {link.value}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="contact-page__author-item">
        <div className="wrapper">
          <AuthorItem />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
