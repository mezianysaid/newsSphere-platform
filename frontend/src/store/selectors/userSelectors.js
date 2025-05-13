import { createSelector } from "@reduxjs/toolkit";

// Base selector
const selectUserState = (state) => state.user;

// Simple selectors
export const selectUser = createSelector(
  selectUserState,
  (userState) => userState.user
);
export const selectIsAuthenticated = createSelector(
  selectUserState,
  (userState) => userState.isAuthenticated
);
export const selectUserLoading = createSelector(
  selectUserState,
  (userState) => userState.loading
);
export const selectUserError = createSelector(
  selectUserState,
  (userState) => userState.error
);

// Complex selectors
export const selectUserProfile = createSelector(selectUser, (user) => ({
  name: user?.name,
  email: user?.email,
  avatar: user?.avatar,
}));

export const selectUserRole = createSelector(selectUser, (user) => user?.role);

// Derived selectors
export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === "admin"
);

export const selectIsCustomer = createSelector(
  selectUserRole,
  (role) => role === "customer"
);

export const selectUserStats = createSelector(
  selectUserState,
  (userState) => userState.userStats
);
