import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import BEMHelper from 'react-bem-helper'
import get from 'lodash/get'
import { getPostItemFlatData } from 'src/helpers'
import Layout from 'src/components/Layout'
import PostList from 'src/components/PostList/PostList'
import AuthorItem from 'src/components/AuthorItem/AuthorItem'
import './index.scss'

const bem = new BEMHelper('index-page')

const IndexPage = ({ location, data }) => {
  const posts = get(data, 'allMarkdownRemark.edges', [])
  const coverImageSizes = get(data, 'coverImage.fluid')

  const flatPosts = posts.map(getPostItemFlatData)

  return (
    <Layout location={location}>
      <div {...bem()}>
        {coverImageSizes && <Img fluid={coverImageSizes} />}

        <div className="wrapper wrapper--wide">
          <div className="page__header">
            <h2 className="page__title">Blog</h2>
          </div>

          <PostList flatPosts={flatPosts} />
        </div>

        <div {...bem('author-item')}>
          <div className="wrapper">
            <AuthorItem />
          </div>
        </div>
      </div>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage

export const pageQuery = graphql`
  {
    coverImage: imageSharp(fluid: { originalName: { regex: "/cover.jpg/" } }) {
      fluid(maxWidth: 1600, maxHeight: 400) {
        ...GatsbyImageSharpFluid
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
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
