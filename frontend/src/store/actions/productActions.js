import { PRODUCT_TYPES } from "../types/productTypes";
import axios from "../../services/axios";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from "../constants/productConstants";

// Fetch all products
export const fetchProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TYPES.FETCH_PRODUCTS_REQUEST });
      const response = await axios.get("/products", { params });
      dispatch({
        type: PRODUCT_TYPES.FETCH_PRODUCTS_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: PRODUCT_TYPES.FETCH_PRODUCTS_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch products",
      });
      throw error;
    }
  };

// Fetch single product
export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.FETCH_PRODUCT_REQUEST });
    const response = await axios.get(`/products/${id}`);
    dispatch({
      type: PRODUCT_TYPES.FETCH_PRODUCT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.FETCH_PRODUCT_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch product",
    });
    throw error;
  }
};

// Create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    

    const { data } = await axios.post("/products/create", productData, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.error("Create product error:", error.response?.data || error);
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Product creation failed",
    });
    throw error; // Re-throw to handle in the component
  }
};

// Update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.UPDATE_PRODUCT_REQUEST });
    const response = await axios.put(`/products/update/${id}`, productData);
    dispatch({
      type: PRODUCT_TYPES.UPDATE_PRODUCT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.UPDATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || "Failed to update product",
    });
    throw error;
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.DELETE_PRODUCT_REQUEST });
    await axios.delete(`/products/delete/${id}`);
    dispatch({
      type: PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.DELETE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || "Failed to delete product",
    });
    throw error;
  }
};

// Search products
export const searchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.SEARCH_PRODUCTS_REQUEST });
    const response = await axios.get(`/products/search?q=${query}`);
    dispatch({
      type: PRODUCT_TYPES.SEARCH_PRODUCTS_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.SEARCH_PRODUCTS_FAILURE,
      payload: error.response?.data?.message || "Failed to search products",
    });
    throw error;
  }
};

// Filter products
export const filterProducts = (filters) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.FILTER_PRODUCTS_REQUEST });
    const response = await axios.get("/products", { params: filters });
    dispatch({
      type: PRODUCT_TYPES.FILTER_PRODUCTS_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.FILTER_PRODUCTS_FAILURE,
      payload: error.response?.data?.message || "Failed to filter products",
    });
    throw error;
  }
};

// Sort products
export const sortProducts = (sortBy) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.SORT_PRODUCTS_REQUEST });
    const response = await axios.get(`/products?sort=${sortBy}`);
    dispatch({
      type: PRODUCT_TYPES.SORT_PRODUCTS_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.SORT_PRODUCTS_FAILURE,
      payload: error.response?.data?.message || "Failed to sort products",
    });
    throw error;
  }
};

// Clear product state
export const clearProductState = () => (dispatch) => {
  dispatch({ type: PRODUCT_TYPES.CLEAR_PRODUCT_STATE });
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("/products");

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Error fetching products",
    });
  }
};

export const ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAIL = "ADD_REVIEW_FAIL";
export const UPDATE_REVIEW_REQUEST = "UPDATE_REVIEW_REQUEST";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAIL = "UPDATE_REVIEW_FAIL";

// Add a review to a product
export const addReview = (productId, reviewData) => async (dispatch) => {
  console.log("Adding review:", productId, reviewData);
  try {
    dispatch({ type: ADD_REVIEW_REQUEST });

    const { data } = await axios.post(
      `/products/${productId}/reviews`,
      reviewData
    );

    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload: error.response?.data?.message || "Error adding review",
    });
  }
};

// Update a review
export const updateReview =
  (productId, reviewId, reviewData) => async (dispatch) => {
    console.log("Updating review:", productId, reviewId, reviewData);
    try {
      dispatch({ type: UPDATE_REVIEW_REQUEST });

      const { data } = await axios.put(
        `/products/${productId}/reviews/${reviewId}`,
        reviewData
      );

      dispatch({
        type: UPDATE_REVIEW_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_REVIEW_FAIL,
        payload: error.response?.data?.message || "Error updating review",
      });
    }
  };
