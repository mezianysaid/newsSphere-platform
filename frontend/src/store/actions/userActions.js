import axios from "../../services/axios";
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
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
} from "../types/userTypes";

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (user, token) => ({
  type: REGISTER_SUCCESS,
  payload: { user, token },
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const setAuth = (user, token) => ({
  type: SET_AUTH,
  payload: { user, token },
});

export const logoutSuccess = () => ({
  type: LOGOUT,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const socialLoginRequest = () => ({
  type: SOCIAL_LOGIN_REQUEST,
});

export const socialLoginSuccess = (user, token) => ({
  type: SOCIAL_LOGIN_SUCCESS,
  payload: { user, token },
});

export const socialLoginFailure = (error) => ({
  type: SOCIAL_LOGIN_FAILURE,
  payload: error,
});

// Async Action Creators with Thunk
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post("/users/login", credentials);
    const { user, token } = response.data;

    // Store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Update axios default headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    dispatch(loginSuccess(user, token));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch(loginFailure(errorMessage));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    // Clear any existing tokens before registration
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];

    const response = await axios.post("/users/register", userData);
    const { user, token } = response.data;

    // Store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Update axios default headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    dispatch(registerSuccess(user, token));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    dispatch(registerFailure(errorMessage));
    throw error;
  }
};

// Google Login
export const googleLogin = (tokenId) => async (dispatch) => {
  try {
    dispatch(socialLoginRequest());
    const { data } = await axios.post("/users/google", { tokenId });
    dispatch(socialLoginSuccess(data.user, data.token));
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Google login failed";
    dispatch(socialLoginFailure(errorMessage));
    throw error;
  }
};

// Facebook Login
export const facebookLogin = (accessToken, userId) => async (dispatch) => {
  try {
    dispatch(socialLoginRequest());
    const { data } = await axios.post("/users/facebook", {
      accessToken,
      userId,
    });
    dispatch(socialLoginSuccess(data.user, data.token));
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Facebook login failed";
    dispatch(socialLoginFailure(errorMessage));
    throw error;
  }
};

// Initialize auth state
export const initializeAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);

        // Set axios default headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          // Verify token with backend
          const response = await axios.get("/users/verify-token");

          // If verification succeeds, update user data with latest from server
          const verifiedUser = response.data.user || user;

          // Update localStorage with latest user data
          localStorage.setItem("user", JSON.stringify(verifiedUser));

          // Dispatch auth state
          dispatch(setAuth(verifiedUser, token));

          return { user: verifiedUser, token };
        } catch (error) {
          console.error("Token verification failed:", error);
          // Clear invalid auth data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Clear invalid auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logout());
      }
    } else {
      // No stored auth data
      dispatch(logout());
    }
  } catch (error) {
    console.error("Auth initialization error:", error);
    dispatch(logout());
  }
};

// Logout action with cleanup
export const logout = () => async (dispatch) => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear axios default headers
    delete axios.defaults.headers.common["Authorization"];

    // Optional: Call logout endpoint if you have one
    try {
      await axios.post("/users/logout");
    } catch (error) {
      console.log("Logout endpoint error:", error);
      // Continue with local logout even if server logout fails
    }

    // Dispatch logout action
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout error:", error);
    // Still dispatch logout even if there's an error
    dispatch(logoutSuccess());
  }
};

// Example of using getState in a thunk
export const updateUserProfile =
  (profileData) => async (dispatch, getState) => {
    try {
      const { token, user } = getState().user;

      if (!token) {
        throw new Error("No authentication token found");
      }

      if (!user || !user._id) {
        throw new Error("User ID not found");
      }

      const { data } = await axios.put(
        `/users/profile/${user._id}`,
        profileData
      );

      // You would need to add corresponding action creators and reducer cases
      // dispatch(updateProfileSuccess(data.user));
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Profile update failed";
      // dispatch(updateProfileFailure(errorMessage));
      throw errorMessage;
    }
  };

// Fetch all users (admin only)
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    const { data } = await axios.get("/admin/users");
    dispatch({
      type: "GET_ALL_USERS_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: "GET_ALL_USERS_FAILURE",
      payload: error.response?.data?.message || "Failed to fetch users",
    });
    throw error;
  }
};

// Fetch user profile data
export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_PROFILE_REQUEST" });
    const { data } = await axios.get("/users/profile");
    dispatch({
      type: "FETCH_USER_PROFILE_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: "FETCH_USER_PROFILE_FAILURE",
      payload: error.response?.data?.message || "Failed to fetch user profile",
    });
    throw error;
  }
};

// Fetch user stats
export const fetchUserStats = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_STATS_REQUEST" });
    const { data } = await axios.get("/users/stats");
    dispatch({
      type: "FETCH_USER_STATS_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: "FETCH_USER_STATS_FAILURE",
      payload: error.response?.data?.message || "Failed to fetch user stats",
    });
    throw error;
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REQUEST" });

    const response = await axios.post("/users/forgot-password", { email });

    dispatch({
      type: "USER_SUCCESS",
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: "USER_FAIL",
      payload:
        error.response?.data?.message || "Failed to send reset password email",
    });
    throw error;
  }
};
