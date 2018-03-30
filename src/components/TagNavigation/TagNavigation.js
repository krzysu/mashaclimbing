import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'
import Link from 'gatsby-link'
import './TagNavigation.scss'

const bem = new BEMHelper('tag-navigation')

const TagNavigation = ({ tags, currentTag }) => {
  return (
    <ul {...bem()}>
      <li key="all">
        <Link
          to={'/'}
          {...bem('item', {
            active: !currentTag,
          })}
        >
          Home
        </Link>
      </li>
      {tags.map(tag => (
        <li key={tag.fieldValue}>
          <Link
            to={`/${kebabCase(tag.fieldValue)}/`}
            {...bem('item', {
              active: currentTag === tag.fieldValue,
            })}
          >
            {startCase(tag.fieldValue)}
          </Link>
        </li>
      ))}
    </ul>
  )
}

TagNavigation.propTypes = {
  tags: PropTypes.array,
  currentTag: PropTypes.string,
}

export default TagNavigation
