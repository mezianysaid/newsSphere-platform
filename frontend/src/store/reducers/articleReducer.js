import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
  success: false,
  page: 1,
  pages: 1,
  total: 0,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticlesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess(state, action) {
      state.loading = false;
      state.articles = action.payload.data;
      state.page = action.payload.page || 1;
      state.pages = action.payload.pages || 1;
      state.total = action.payload.total || action.payload.data?.length || 0;
    },
    fetchArticlesFailure(state, action) {
      state.loading = false;
      state.error = action.payload || "Failed to fetch articles";
    },
    fetchArticleRequest(state) {
      state.loading = true;
      state.error = null;
      state.article = null;
    },
    fetchArticleSuccess(state, action) {
      state.loading = false;
      state.article = action.payload.data || action.payload;
    },
    fetchArticleFailure(state, action) {
      state.loading = false;
      state.error = action.payload || "Failed to fetch article";
    },
    clearArticleError(state) {
      state.error = null;
    },
    createArticleRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createArticleSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.articles.unshift(action.payload.data || action.payload);
    },
    createArticleFailure(state, action) {
      state.loading = false;
      state.error = action.payload || "Failed to create article";
      state.success = false;
    },
  },
});

export const {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchArticleRequest,
  fetchArticleSuccess,
  fetchArticleFailure,
  clearArticleError,
  createArticleRequest,
  createArticleSuccess,
  createArticleFailure,
} = articleSlice.actions;

export default articleSlice.reducer;
