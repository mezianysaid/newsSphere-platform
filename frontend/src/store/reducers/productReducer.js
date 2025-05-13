import { PRODUCT_TYPES } from "../types/productTypes";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
  CLEAR_ERRORS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
} from "../constants/productConstants";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  searchResults: [],
  filters: {
    category: null,
    priceRange: null,
    rating: null,
  },
  sortBy: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Products
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch Single Product
    case PRODUCT_TYPES.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_TYPES.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_TYPES.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Product
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    // Update Product
    case PRODUCT_TYPES.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_TYPES.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        product: action.payload,
      };
    case PRODUCT_TYPES.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Product
    case PRODUCT_TYPES.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        product: null,
      };
    case PRODUCT_TYPES.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Search Products
    case PRODUCT_TYPES.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_TYPES.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };
    case PRODUCT_TYPES.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Filter Products
    case PRODUCT_TYPES.FILTER_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_TYPES.FILTER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        filters: action.payload.filters,
        pagination: action.payload.pagination,
      };
    case PRODUCT_TYPES.FILTER_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Sort Products
    case PRODUCT_TYPES.SORT_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_TYPES.SORT_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        sortBy: action.payload.sortBy,
        pagination: action.payload.pagination,
      };
    case PRODUCT_TYPES.SORT_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Product State
    case PRODUCT_TYPES.CLEAR_PRODUCT_STATE:
      return initialState;

    // Add Review
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        product: {
          ...state.product,
          reviews: [...(state.product?.reviews || []), action.payload],
        },
      };
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Review
    case UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        product: {
          ...state.product,
          reviews: state.product?.reviews.map((review) =>
            review._id === action.payload._id ? action.payload : review
          ),
        },
      };
    case UPDATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
