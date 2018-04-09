import React from 'react'
import PropTypes from 'prop-types'
import HeadMeta from 'components/HeadMeta'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import 'normalize.css/normalize.css'
import 'stylesheets/styles.scss'

const Layout = ({ location, children, data }) => {
  return (
    <div>
      <HeadMeta
        site={data.headMetaSite}
        imageUrl={data.headMetaImage.sizes.src}
        pathname={location.pathname}
      />
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
    headMetaSite: site {
      ...HeadMetaSiteFragment
    }
    headMetaImage: imageSharp(id: { regex: "/profile.jpg/" }) {
      sizes(maxWidth: 700, maxHeight: 700) {
        src
      }
    }
    allTags: allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
