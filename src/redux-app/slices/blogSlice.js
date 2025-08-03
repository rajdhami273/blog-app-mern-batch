import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePost: (state, action) => {
      const { _id, ...rest } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === _id);
      console.log(postIndex);
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          ...rest,
        };
      }
    },
  },
});

export const { setPosts, addPost, deletePost, updatePost } = blogSlice.actions;

export default blogSlice.reducer;
