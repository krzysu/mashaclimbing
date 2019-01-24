import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { getEmail } from 'src/helpers'
import Img from 'gatsby-image'
import Layout from 'src/components/Layout'
import AuthorItem from 'src/components/AuthorItem/AuthorItem'
import Separator from 'src/components/Separator/Separator'
import './contact.scss'

const ContactPage = ({ location, data }) => {
  const coverImageSizes = get(data, 'coverImage.fluid')

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
    <Layout location={location}>
      <div className="contact-page">
        {coverImageSizes && <Img fluid={coverImageSizes} />}

        <div className="wrapper">
          <div className="page__header">
            <h2 className="page__title">Contact</h2>
            <ul className="contact-page__content">
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
            <Separator />
          </div>
        </div>

        <div className="contact-page__author-item">
          <div className="wrapper">
            <AuthorItem />
          </div>
        </div>
      </div>
    </Layout>
  )
}

ContactPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
}

export default ContactPage

export const pageQuery = graphql`
  {
    coverImage: imageSharp(fluid: { originalName: { regex: "/cover.jpg/" } }) {
      fluid(maxWidth: 1600, maxHeight: 400) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
