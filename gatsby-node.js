const Promise = require('bluebird')
const path = require('path')
const get = require('lodash/get')
const kebabCase = require('lodash/kebabCase')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  excerpt
                  frontmatter {
                    path
                    title
                    date(formatString: "MMMM Do, YYYY")
                    tags
                    image {
                      childImageSharp {
                        fluid(maxWidth: 800) {
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

        createPostPages(createPage, posts)
        createTagPages(createPage, posts)
      })
    )
  })
}

const createPostPages = (createPage, posts) => {
  const postTemplate = path.resolve('./src/templates/post.js')

  posts.forEach((post, index) => {
    const readNext = getReadNextPosts(posts, post)
    createPage({
      path: post.node.frontmatter.path,
      component: postTemplate,
      context: {
        readNext,
      },
    })
  })
}

const createTagPages = (createPage, posts) => {
  const tagTemplate = path.resolve('./src/templates/tags.js')

  const tags = posts
    .reduce((tags, edge) => {
      if (get(edge, 'node.frontmatter.tags')) {
        return tags.concat(edge.node.frontmatter.tags)
      }
      return tags
    }, [])
    .filter((tag, index, tags) => tags.indexOf(tag) === index)

  tags.forEach(tag => {
    createPage({
      path: `/${kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

const getReadNextPosts = (posts, currentPost) => {
  return posts
    .filter(post => post !== currentPost)
    .slice(0, 3)
    .map(getPostItemFlatData)
}

const getPostItemFlatData = edge => {
  console.log(edge)
  return {
    path: edge.node.frontmatter.path,
    date: edge.node.frontmatter.date,
    title: edge.node.frontmatter.title,
    excerpt: edge.node.excerpt,
    imageSizes: get(edge, 'node.frontmatter.image.childImageSharp.fluid', {}),
  }
}
