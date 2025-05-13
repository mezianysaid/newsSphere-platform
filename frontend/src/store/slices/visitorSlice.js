import { createSlice } from "@reduxjs/toolkit";

// Load visitor count from localStorage
const loadVisitorCount = () => {
  try {
    const count = localStorage.getItem("visitorCount");

    return count ? parseInt(count) : 0;
  } catch (error) {
    return 0;
  }
};

// Save visitor count to localStorage
const saveVisitorCount = (count) => {
  try {
    localStorage.setItem("visitorCount", count.toString());
  } catch (error) {
    return 0;
  }
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState: {
    count: loadVisitorCount(),
    loading: false,
    error: null,
  },
  reducers: {
    incrementVisitor: (state) => {
      state.count += 1;
      saveVisitorCount(state.count);
    },
    setVisitorCount: (state, action) => {
      state.count = action.payload;
      saveVisitorCount(state.count);
    },
  },
});

export const { incrementVisitor, setVisitorCount } = visitorSlice.actions;
export default visitorSlice.reducer;
