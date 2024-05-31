import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email") || "",
  authToken: localStorage.getItem("token") || "",
  isLoggedIn: !!localStorage.getItem("token"),
  loader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.authToken = action.payload.authToken;
      state.email = action.payload.email;

      if (!state.authToken || !state.email) {
        state.isLoggedIn = false;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.authToken = localStorage.removeItem("token");
      state.email = localStorage.removeItem("email");
    },
    toggleLoader(state, action) {
      state.loader = action.payload;
    },
  },
});

export const { login, logout, toggleLoader } = authSlice.actions;

export default authSlice;
