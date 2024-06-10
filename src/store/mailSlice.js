import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailData: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialState,
  reducers: {
    addMail(state, action) {
      state.mailData.push(action.payload);
    },
  },
});

export const { addMail } = mailSlice.actions;
export default mailSlice;
