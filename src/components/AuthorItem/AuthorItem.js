import React from 'react'
import profilePic from './profile.jpg'
import './AuthorItem.scss'

const AuthorItem = () => {
  return (
    <div className="author-item">
      <img src={profilePic} alt="masha" className="author-item__image" />
      <div className="author-item__description">
        For a couple of years I've been doing bouldering and rock climbing. Once I've decided to
        record one interesting problem each week to have some memories in the future. "Masha
        Climbing" is a channel where I post videos of my climbing. I will be glad if it can be
        interesting for somebody else :)
      </div>
    </div>
  )
}

export default AuthorItem
