import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import favoriteReducer from "./slices/favoriteSlice";
import emailReducer from "./slices/emailSlice";
import visitorReducer from "./slices/visitorSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    products: productReducer,
    user: userReducer,
    email: emailReducer,
    visitors: visitorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values
      thunk: {
        // Thunk middleware options
        extraArgument: {
          // You can add extra arguments here that will be available to all thunks
          api: "/api", // Example: API base URL
        },
      },
    }),
});

export default store;
