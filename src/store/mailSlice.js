import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailData: [],
  inboxData: [],
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
  },
});

export const { addMail, fetchInboxData } = mailSlice.actions;
export default mailSlice;
