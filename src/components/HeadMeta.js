import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import get from 'lodash/get'

const HeadMeta = props => {
  const blogTitle = props.site.siteMetadata.title
  const blogDescription = props.site.siteMetadata.description
  const siteUrl = props.site.siteMetadata.siteUrl
  const excerpt = get(props, 'page.excerpt')
  const title = get(props, 'page.frontmatter.title')
  const path = props.pathname || get(props, 'page.frontmatter.path', '')
  const imageUrl =
    props.imageUrl || get(props, 'page.frontmatter.image.publicURL', '')

  const metaTitle = title
    ? `${title} | ${blogTitle}`
    : `${blogTitle} | ${blogDescription}`
  const metaDescription = excerpt || blogDescription
  const fullMetaImageUrl = siteUrl + imageUrl
  const fullPath = siteUrl + path

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullPath} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={fullMetaImageUrl} />
      <meta property="og:locale" content="en_EN" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@mashaclimbing" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullMetaImageUrl} />
    </Helmet>
  )
}

HeadMeta.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object,
  pathname: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default HeadMeta

export const query = graphql`
  fragment HeadMetaSiteFragment on Site {
    siteMetadata {
      title
      description
      siteUrl
    }
  }

  fragment HeadMetaMarkdownFragment on MarkdownRemark {
    excerpt
    frontmatter {
      title
      path
      image {
        publicURL
      }
    }
  }
`
