import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import Link from 'gatsby-link'
import './PostItem.scss'

const bem = new BEMHelper('post-item')

const PostItem = ({ post, headlineTag }) => {
  const Headline = headlineTag || 'h2'

  return (
    <div {...bem()}>
      <Headline {...bem('headline')}>
        <Link to={post.path} {...bem('headline-link')}>
          {post.title}
        </Link>
      </Headline>
      <div {...bem('published')}>
        <small>Published on {post.date}</small>
      </div>
      <p {...bem('body')}>{post.excerpt}</p>
    </div>
  )
}

PostItem.propTypes = {
  headlineTag: PropTypes.string,
  post: PropTypes.shape({
    path: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
  }),
}

export default PostItem
