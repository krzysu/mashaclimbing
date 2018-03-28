import React from 'react'
import Button from 'components/Button/Button'
import AuthorItem from 'components/AuthorItem/AuthorItem'

const Page404 = () => {
  return (
    <div className="wrapper">
      <div
        style={{
          padding: '9em 0 12em',
          textAlign: 'center',
        }}
      >
        <h1>404 - page not found</h1>
        <Button href="/">back to home</Button>
      </div>
      <div style={{ paddingBottom: '1.5em' }}>
        <AuthorItem />
      </div>
    </div>
  )
}

export default Page404
