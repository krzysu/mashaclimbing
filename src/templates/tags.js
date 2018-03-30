import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { getPostItemFlatData } from 'helpers'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import PostList from 'components/PostList/PostList'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import './tags.scss'

const TagsTemplate = ({ pathContext, data }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allMarkdownRemark.edges', [])
  const flatPosts = posts.map(getPostItemFlatData)

  return (
    <div>
      <Helmet title={siteTitle} />

      <div className="wrapper wrapper--wide">
        <div className="page__header">
          <h2 className="page__title">{pathContext.tag.toUpperCase()}</h2>
        </div>

        <PostList flatPosts={flatPosts} />
      </div>
      <div className="tags-page__author-item">
        <div className="wrapper">
          <AuthorItem />
        </div>
      </div>
    </div>
  )
}

TagsTemplate.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.object,
}

export default TagsTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, published: { eq: true } } }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
            path
            image {
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
