export const ADD_BLOG = `
  mutation AddBlog($title: String!, $content: String!) {
    addBlog(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const GET_BLOGS = `
  query {
    blogs {
      id
      title
      content
      recomments {
        id
        content
        author {
        name
        email
        }
      }
      author {
        name,
        email
      }
    }
  }
`;
export const GET_BLOG = `
  query GetBlog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      recomments {
        id
        content
        author {
          name, email
        }
      }
    }
  }
`;

export const ADD_recomment = `
  mutation Addrecomment($id: ID!, $content: String!) {
    addRecomment(id: $id, content: $content) {
      id
      content
    }
  }
`;
