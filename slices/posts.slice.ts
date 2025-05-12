import { createPost, fetchPosts } from "@/services/api";
import { NewPost } from "@/types/new.post";
import { Post } from "@/types/post";
import { PostsState } from "@/types/posts.state";
import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await fetchPosts();
  return response;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData: NewPost) => {
    const response = await createPost(postData);
    return response;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload as Draft<Post>[];
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(addPost.pending, (state) => {
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload as Draft<Post>);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add post";
      });
  },
});

export const postsReducer = postsSlice.reducer;
