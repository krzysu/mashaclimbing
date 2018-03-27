import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import PostItem from 'components/PostItem/PostItem'
import './PostList.scss'

const bem = new BEMHelper('post-list')

const PostList = ({ posts }) => {
  return (
    <div {...bem()}>
      {posts.map((post, index) => {
        return (
          <div key={index} {...bem('item')}>
            <PostItem post={post} />
            <hr {...bem('separator')} />
          </div>
        )
      })}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array,
}

export default PostList
