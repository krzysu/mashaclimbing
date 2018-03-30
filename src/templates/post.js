import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { getPostFlatData } from 'helpers'
import Post from 'components/Post/Post'

const PostTemplate = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const readNext = get(props, 'pathContext.readNext')

  const post = getPostFlatData(props.data.markdownRemark)

  return (
    <div>
      <Helmet title={`${post.title} | ${siteTitle}`} />
      <Post post={post} readNext={readNext} />
    </div>
  )
}

PostTemplate.propTypes = {
  pathContext: PropTypes.shape({
    readNext: PropTypes.array.isRequired,
  }),
  data: PropTypes.object,
}

export default PostTemplate

export const pageQuery = graphql`
  query PostPage($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
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
`
