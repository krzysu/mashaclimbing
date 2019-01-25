import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import { getPostItemFlatData } from 'src/helpers'
import Layout from 'src/components/Layout'
import PostList from 'src/components/PostList/PostList'
import AuthorItem from 'src/components/AuthorItem/AuthorItem'
import './tags.scss'

const TagsTemplate = ({ location, pageContext, data }) => {
  const posts = get(data, 'allMarkdownRemark.edges', [])
  const coverImageSizes = get(data, 'coverImage.fluid')

  const flatPosts = posts.map(getPostItemFlatData)

  return (
    <Layout location={location}>
      <div>
        {coverImageSizes && <Img fluid={coverImageSizes} />}
        <div className="wrapper wrapper--wide">
          <div className="page__header">
            <h2 className="page__title">{startCase(pageContext.tag)}</h2>
          </div>
          <PostList flatPosts={flatPosts} />
        </div>
        <div className="tags-page__author-item">
          <div className="wrapper">
            <AuthorItem />
          </div>
        </div>
      </div>
    </Layout>
  )
}

TagsTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.object,
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    coverImage: imageSharp(fluid: { originalName: { regex: "/cover.jpg/" } }) {
      fluid(maxWidth: 1600, maxHeight: 400) {
        ...GatsbyImageSharpFluid
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
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
