import React from 'react'
import Layout from 'src/components/Layout'
import Button from 'src/components/Button/Button'
import AuthorItem from 'src/components/AuthorItem/AuthorItem'

const Page404 = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="wrapper">
        <div
          style={{
            padding: '9em 0 12em',
            textAlign: 'center',
          }}
        >
          <h1>page not found</h1>
          <Button href="/">back to home</Button>
        </div>
        <div style={{ paddingBottom: '1.5em' }}>
          <AuthorItem />
        </div>
      </div>
    </Layout>
  )
}

export default Page404
