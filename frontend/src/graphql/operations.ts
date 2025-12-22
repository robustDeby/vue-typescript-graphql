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
export const GET_BLOG = `
  query GetBlog($id: ID!) {
    blog(id: $id) {
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

export const ADD_RECOMMEND = `
  mutation AddRecommend($id: ID!, $content: String!) {
    addRecommend(id: $id, content: $content) {
      id
      content
    }
  }
`
