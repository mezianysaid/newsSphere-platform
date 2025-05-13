import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  SET_AUTH,
  CLEAR_ERROR,
} from "../types/userTypes";

// Helper function to get user data from localStorage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Initialize state with stored values
const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  userProfile: null,
  userStats: {
    orders: 0,
    wishlist: 0,
    reviews: 0,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        userProfile: null,
        userStats: {
          orders: 0,
          wishlist: 0,
          reviews: 0,
        },
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // Get all users cases
    case "GET_ALL_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_ALL_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
        error: null,
      };

    case "GET_ALL_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch user profile cases
    case "FETCH_USER_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_USER_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        error: null,
      };

    case "FETCH_USER_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch user stats cases
    case "FETCH_USER_STATS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_USER_STATS_SUCCESS":
      return {
        ...state,
        loading: false,
        userStats: action.payload,
        error: null,
      };

    case "FETCH_USER_STATS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
