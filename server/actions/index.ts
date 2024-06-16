import { login, logout, register } from './auth'
import { createPost, getPosts, deletePost } from './post'

export const actions = {
  auth: {
    mutation: {
      login,
      register,
      logout,
    },
  },
  post: {
    query: {
      getPosts,
    },
    mutation: {
      createPost,
      deletePost,
    },
  },
}
