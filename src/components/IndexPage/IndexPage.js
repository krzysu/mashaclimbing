import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import BEMHelper from 'react-bem-helper'
import PostItem from 'components/PostItem/PostItem'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import './IndexPage.scss'

const bem = new BEMHelper('index-page')

const IndexPage = ({ data }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allMarkdownRemark.edges')

  const flatPosts = posts.map(post => ({
    path: post.node.frontmatter.path,
    date: post.node.frontmatter.date,
    title: post.node.frontmatter.title,
    excerpt: post.node.excerpt,
    imageSizes: get(post, 'node.frontmatter.image.childImageSharp.sizes', {}),
  }))

  return (
    <div {...bem()}>
      <Helmet title={siteTitle} />
      <div className="wrapper wrapper--wide">
        <div {...bem('post-list')}>
          <div className="page__header">
            <h2 className="page__title">Blog</h2>
          </div>

          <div className="grid">
            {flatPosts.map((post, index) => (
              <div key={index} {...bem('post-list-item', null, 'grid__item')}>
                <PostItem post={post} />
              </div>
            ))}
          </div>
        </div>
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
