const Promise = require('bluebird')
const path = require('path')
const get = require('lodash/get')

const getPostItemFlatData = edge => {
  return {
    path: edge.node.frontmatter.path,
    date: edge.node.frontmatter.date,
    title: edge.node.frontmatter.title,
    excerpt: edge.node.excerpt,
    imageSizes: get(edge, 'node.frontmatter.image.childImageSharp.sizes', {}),
  }
}

const getReadNextPosts = (posts, currentPost) => {
  return posts
    .filter(post => post !== currentPost)
    .slice(0, 3)
    .map(getPostItemFlatData)
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  excerpt
                  frontmatter {
                    date(formatString: "MMMM Do, YYYY")
                    title
                    path
                    image {
                      childImageSharp {
                        sizes(maxWidth: 800) {
                          base64
                          aspectRatio
                          src
                          srcSet
                          sizes
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        // Create blog posts pages.
        posts.forEach((post, index) => {
          const readNext = getReadNextPosts(posts, post)
          createPage({
            path: post.node.frontmatter.path,
            component: blogPost,
            context: {
              readNext,
            },
          })
        })
      })
    )
  })
}
