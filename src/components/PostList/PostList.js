import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import PostItem from 'src/components/PostItem/PostItem'
import './PostList.scss'

const bem = new BEMHelper('post-list')

const PostList = ({ flatPosts }) => {
  return (
    <div {...bem(null, null, 'grid')}>
      {flatPosts.map((post, index) => (
        <div key={index} {...bem('item', null, 'grid__item')}>
          <PostItem post={post} />
        </div>
      ))}
    </div>
  )
}

PostList.propTypes = {
  flatPosts: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      date: PropTypes.string,
      title: PropTypes.string,
      excerpt: PropTypes.string,
      imageSizes: PropTypes.object,
    })
  ),
}

export default PostList
