// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const SOCIAL_LOGIN_REQUEST = "user/SOCIAL_LOGIN_REQUEST";
export const SOCIAL_LOGIN_SUCCESS = "user/SOCIAL_LOGIN_SUCCESS";
export const SOCIAL_LOGIN_FAILURE = "user/SOCIAL_LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";
export const SET_AUTH = "SET_AUTH";
export const CLEAR_ERROR = "CLEAR_ERROR";
// the base URL OF API
export const API_URL = "http://localhost:5000/api";
// State Types
export const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

// User Type
export const userType = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  role: "",
  createdAt: "",
  updatedAt: "",
};
