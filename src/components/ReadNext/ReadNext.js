import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import PostItem from 'components/PostItem/PostItem'
import './ReadNext.scss'

const bem = new BEMHelper('read-next')

const ReadNext = ({ readNext }) => {
  return (
    <div {...bem(null, null, 'wrapper wrapper--wide')}>
      <div className="page__header">
        <h2 className="page__title">Read more</h2>
      </div>
      <div className="grid">
        {readNext.map((post, index) => {
          return (
            <div key={index} {...bem('item', null, 'grid__item')}>
              <PostItem post={post} headlineTag="h3" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

ReadNext.propTypes = {
  readNext: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      date: PropTypes.string,
      title: PropTypes.string,
      excerpt: PropTypes.string,
      imageSizes: PropTypes.object,
    })
  ),
}

export default ReadNext
