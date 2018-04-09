import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import 'normalize.css/normalize.css'
import 'stylesheets/styles.scss'

const Layout = ({ location, children, data }) => {
  return (
    <div>
      <Header pathname={location.pathname} tags={data.allTags.group} />
      <div className="body">{children()}</div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
}

export default Layout

export const pageQuery = graphql`
  query LayoutQuery {
    allTags: allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
