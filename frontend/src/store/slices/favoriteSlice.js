import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavoritesFromStorage(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
