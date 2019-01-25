import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { getPostFlatData } from 'src/helpers'
import Layout from 'src/components/Layout'
import HeadMeta from 'src/components/HeadMeta'
import Post from 'src/components/Post/Post'

const PostTemplate = props => {
  const readNext = get(props, 'pageContext.readNext')
  const post = getPostFlatData(props.data.markdownRemark)

  return (
    <Layout location={props.location}>
      <div>
        <HeadMeta site={props.data.headMetaSite} page={props.data.headMetaPage} />
        <Post post={post} readNext={readNext} />
      </div>
    </Layout>
  )
}

PostTemplate.propTypes = {
  pageContext: PropTypes.shape({
    readNext: PropTypes.array.isRequired,
  }),
  data: PropTypes.object,
}

export default PostTemplate

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
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
