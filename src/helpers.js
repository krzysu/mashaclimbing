import get from 'lodash/get'

export const getPostFlatData = remark => {
  return {
    date: remark.frontmatter.date,
    title: remark.frontmatter.title,
    body: remark.html,
    imageSizes: get(remark, 'frontmatter.image.childImageSharp.sizes'),
  }
}

export const getPostItemFlatData = edge => {
  return {
    path: edge.node.frontmatter.path,
    date: edge.node.frontmatter.date,
    title: edge.node.frontmatter.title,
    excerpt: edge.node.excerpt,
    imageSizes: get(edge, 'node.frontmatter.image.childImageSharp.sizes', {}),
  }
}

const isServer = () => {
  return !(typeof window !== 'undefined' && window.document)
}

export const getEmail = () => {
  if (isServer()) {
    return 'spam-protected@email.com'
  }

  return 'moc.liamg@hsutamiram'
    .split('')
    .reverse()
    .join('')
}
