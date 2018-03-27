import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Post from 'components/Post/Post'

class BlogPostTemplate extends React.Component {
  render() {
    const remark = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const post = {
      date: remark.frontmatter.date,
      title: remark.frontmatter.title,
      body: remark.html,
    }

    return (
      <div>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <Post post={post} />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPost($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
