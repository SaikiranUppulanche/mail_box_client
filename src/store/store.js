import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import mailSlice from "./mailSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail: mailSlice.reducer,
  },
});

export default store;
