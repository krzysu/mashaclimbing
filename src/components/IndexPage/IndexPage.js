import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import BEMHelper from 'react-bem-helper'
import Img from 'gatsby-image'
import { getPostItemFlatData } from 'helpers'
import PostList from 'components/PostList/PostList'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import './IndexPage.scss'

const bem = new BEMHelper('index-page')

const IndexPage = ({ data }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allMarkdownRemark.edges', [])
  const coverImageSizes = get(data, 'coverImage.sizes')

  const flatPosts = posts.map(getPostItemFlatData)

  return (
    <div {...bem()}>
      <Helmet title={siteTitle} />
      {coverImageSizes && (
        <Img sizes={coverImageSizes} {...bem('cover-image')} />
      )}
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
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
