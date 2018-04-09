import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'
import { getPostItemFlatData } from 'helpers'
import Img from 'gatsby-image'
import HeadMeta from 'components/HeadMeta'
import TagNavigation from 'components/TagNavigation/TagNavigation'
import PostList from 'components/PostList/PostList'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import './tags.scss'

const TagsTemplate = ({ pathContext, data }) => {
  const posts = get(data, 'allMarkdownRemark.edges', [])
  const coverImageSizes = get(data, 'coverImage.sizes')

  const flatPosts = posts.map(getPostItemFlatData)

  return (
    <div>
      <HeadMeta
        site={data.headMetaSite}
        imageUrl={data.headMetaImage.sizes.src}
        path={`/${kebabCase(pathContext.tag)}/`}
      />
      {coverImageSizes && <Img sizes={coverImageSizes} />}
      <div className="wrapper wrapper--wide">
        <div className="page__header">
          <TagNavigation
            tags={data.allTags.group}
            currentTag={pathContext.tag}
          />
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
    allTags: allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
