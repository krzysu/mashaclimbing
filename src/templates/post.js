import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { getPostFlatData } from 'helpers'
import HeadMeta from 'components/HeadMeta'
import Post from 'components/Post/Post'

const PostTemplate = props => {
  const readNext = get(props, 'pathContext.readNext')
  const post = getPostFlatData(props.data.markdownRemark)

  return (
    <div>
      <HeadMeta site={props.data.headMetaSite} page={props.data.headMetaPage} />
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

    headMetaSite: site {
      ...HeadMetaSiteFragment
    }
    headMetaPage: markdownRemark(frontmatter: { path: { eq: $path } }) {
      ...HeadMetaMarkdownFragment
    }
  }
`
