import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailData: [],
  inboxData: [],
  sentData: [],
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
    fetchSentData(state, action) {
      state.sentData = action.payload;
    },
    messageDisplay(state, action) {
      state.message = state.inboxData.filter(
        (item) => item.id === action.payload
      );
    },
    updateInboxData(state, action) {
      state.inboxData = state.inboxData.filter(
        (mail) => mail.id !== action.payload
      );
    },
    updateSentData(state, action) {
      state.sentData = state.sentData.filter(
        (mail) => mail.id !== action.payload
      );
    },
  },
});

export const {
  addMail,
  fetchInboxData,
  fetchSentData,
  messageDisplay,
  updateInboxData,
  updateSentData,
} = mailSlice.actions;
export default mailSlice;
