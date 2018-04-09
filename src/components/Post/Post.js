import React from 'react'
import PropTypes from 'prop-types'
import AuthorItem from 'components/AuthorItem/AuthorItem'
import Img from 'gatsby-image'
import ReadNext from 'components/ReadNext/ReadNext'
import './Post.scss'

const Post = ({ post, readNext }) => {
  return (
    <div>
      <div className="wrapper post-wrapper">
        <div className="post">
          {post.imageSizes && <Img sizes={post.imageSizes} className="post__image" />}
          <h1 className="post__title">{post.title}</h1>
          <div className="post__published">
            <small>Published on {post.date}</small>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </div>

      {readNext && <ReadNext readNext={readNext} />}

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
    imageSizes: PropTypes.object,
  }),
  readNext: PropTypes.array,
}

export default Post
