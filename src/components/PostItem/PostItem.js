import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import isEmpty from 'lodash/isEmpty'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import './PostItem.scss'

const bem = new BEMHelper('post-item')

const PostItem = ({ post, headlineTag }) => {
  const Headline = headlineTag || 'h2'

  return (
    <Link to={post.path} {...bem()}>
      {!isEmpty(post.imageSizes) && <Img sizes={post.imageSizes} {...bem('image')} />}
      <Headline {...bem('headline')}>{post.title}</Headline>
      <p {...bem('body')}>{post.excerpt}</p>
    </Link>
  )
}

PostItem.propTypes = {
  headlineTag: PropTypes.string,
  post: PropTypes.shape({
    path: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    imageSizes: PropTypes.object,
  }),
}

export default PostItem
