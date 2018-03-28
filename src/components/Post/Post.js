import React from 'react'
import PropTypes from 'prop-types'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import './Post.scss'

const Post = ({ post }) => {
  return (
    <div>
      <div className="wrapper post-wrapper">
        <div className="post">
          <div className="post__published">
            <small>Published on {post.date}</small>
          </div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </div>

      <div className="wrapper">
        <div className="page__header">
          <h2 className="page__title">About me</h2>
        </div>
        <div className="post-author-item">
          <AuthorItem />
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
}

export default Post
