export const ADD_BLOG = `
  mutation AddBlog($title: String!, $content: String!) {
    addBlog(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

export const GET_BLOGS = `
  query {
    blogs {
      id
      title
      content
      recommends {
        id
        content
      }
    }
  }
`
