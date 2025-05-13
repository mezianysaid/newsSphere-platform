import axios from "axios";

// Get initial token from localStorage
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       // Clear invalid auth data
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Clear auth header
//       delete instance.defaults.headers.common["Authorization"];

//       // Redirect to login
//       window.location.href = "/login";
//     }

//     // Handle 403 Forbidden
//     if (error.response?.status === 403) {
//       // Clear invalid auth data
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Clear auth header
//       delete instance.defaults.headers.common["Authorization"];

//       // Redirect to login
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default instance;
