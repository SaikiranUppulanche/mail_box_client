import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailData: [],
  inboxData: [],
  message: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialState,
  reducers: {
    addMail(state, action) {
      state.mailData.push(action.payload);
    },
    fetchInboxData(state, action) {
      state.inboxData = action.payload;
    },
    messageDisplay(state, action) {
      state.message = state.inboxData.filter(
        (item) => item.id === action.payload
      );
    },
  },
});

export const { addMail, fetchInboxData, messageDisplay } = mailSlice.actions;
export default mailSlice;
