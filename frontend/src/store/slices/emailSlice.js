import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk for sending contact form email
export const sendContactEmail = createAsyncThunk(
  "email/sendContactEmail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

// Initial state
const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  success: false,
};

// Create the email slice
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    resetEmailState: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactEmail.fulfilled, (state) => {
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(sendContactEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export actions
export const { resetEmailState } = emailSlice.actions;

// Export selectors
export const selectEmailStatus = (state) => state.email.status;
export const selectEmailError = (state) => state.email.error;
export const selectEmailSuccess = (state) => state.email.success;

// Export reducer
export default emailSlice.reducer;
