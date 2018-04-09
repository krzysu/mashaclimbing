import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import get from 'lodash/get'
import { getPostItemFlatData } from 'helpers'
import Img from 'gatsby-image'
import HeadMeta from 'components/HeadMeta'
import TagNavigation from 'components/TagNavigation/TagNavigation'
import PostList from 'components/PostList/PostList'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import Logo from 'components/Logo/Logo'
import './index.scss'

const bem = new BEMHelper('index-page')

const IndexPage = ({ data }) => {
  const posts = get(data, 'allMarkdownRemark.edges', [])
  const coverImageSizes = get(data, 'coverImage.sizes')

  const flatPosts = posts.map(getPostItemFlatData)

  return (
    <div {...bem()}>
      <HeadMeta
        site={data.headMetaSite}
        imageUrl={data.headMetaImage.sizes.src}
      />

      {coverImageSizes && (
        <div>
          <div className="wrapper wrapper--wide index-page__header">
            <Logo />
          </div>
          <Img sizes={coverImageSizes} />
        </div>
      )}

      <div className="wrapper wrapper--wide">
        <div className="page__header">
          <TagNavigation tags={data.allMarkdownRemark.tags} />
        </div>

        <PostList flatPosts={flatPosts} />
      </div>
      <div {...bem('author-item')}>
        <div className="wrapper">
          <AuthorItem />
        </div>
      </div>
    </div>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPage {
    headMetaSite: site {
      ...HeadMetaSiteFragment
    }
    headMetaImage: imageSharp(id: { regex: "/profile.jpg/" }) {
      sizes(maxWidth: 700, maxHeight: 700) {
        src
      }
    }
    coverImage: imageSharp(id: { regex: "/cover.jpg/" }) {
      sizes(maxWidth: 1600, maxHeight: 400) {
        ...GatsbyImageSharpSizes
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
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
      tags: group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
