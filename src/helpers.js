import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'

export const getPostFlatData = remark => {
  return {
    date: remark.frontmatter.date,
    title: remark.frontmatter.title,
    body: remark.html,
    imageSizes: get(remark, 'frontmatter.image.childImageSharp.fluid'),
  }
}

export const getPostItemFlatData = edge => {
  return {
    path: edge.node.frontmatter.path,
    date: edge.node.frontmatter.date,
    title: edge.node.frontmatter.title,
    excerpt: edge.node.excerpt,
    imageSizes: get(edge, 'node.frontmatter.image.childImageSharp.fluid', {}),
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

export const getTagLinks = (tags, pathname) => {
  return tags.map(tag => {
    const href = `/${kebabCase(tag.fieldValue)}/`
    return {
      label: startCase(tag.fieldValue),
      href,
      isActive: pathname === href,
    }
  })
}
