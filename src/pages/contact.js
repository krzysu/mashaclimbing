import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { getEmail } from 'helpers'
import Img from 'gatsby-image'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import './contact.scss'

const ContactPage = ({ data }) => {
  const coverImageSizes = get(data, 'coverImage.sizes')

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
      {coverImageSizes && <Img sizes={coverImageSizes} />}

      <div className="wrapper contact-page__content">
        <div className="page__header">
          <h2 className="page__title">Contact</h2>
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

export const pageQuery = graphql`
  query ContactPage {
    coverImage: imageSharp(id: { regex: "/cover.jpg/" }) {
      sizes(maxWidth: 1600, maxHeight: 400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
