import axios from "../../services/axios";
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchArticleRequest,
  fetchArticleSuccess,
  fetchArticleFailure,
  createArticleRequest,
  createArticleSuccess,
  createArticleFailure,
  clearArticleError,
} from "../reducers/articleReducer";

export const fetchArticles =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest());
      const { data } = await axios.get("/articles", { params });
      dispatch(fetchArticlesSuccess(data));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch articles";
      dispatch(fetchArticlesFailure(message));
      throw error;
    }
  };

export const fetchArticle = (id) => async (dispatch) => {
  try {
    dispatch(fetchArticleRequest());
    const { data } = await axios.get(`/articles/${id}`);
    dispatch(fetchArticleSuccess(data));
    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch article";
    dispatch(fetchArticleFailure(message));
    throw error;
  }
};

export const createArticle = (articleData) => async (dispatch) => {
  try {
    dispatch(createArticleRequest());
    const { data } = await axios.post("/articles", articleData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(createArticleSuccess(data));
    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create article";
    dispatch(createArticleFailure(message));
    throw error;
  }
};

export const clearArticleErrorAction = () => (dispatch) => {
  dispatch(clearArticleError());
};
