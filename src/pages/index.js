import React from 'react'
import IndexPage from 'components/IndexPage/IndexPage'

const BlogIndex = ({ data }) => {
  return <IndexPage data={data} />
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
            path
          }
        }
      }
    }
  }
`
