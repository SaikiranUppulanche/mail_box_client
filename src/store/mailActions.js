import {
  addMail,
  fetchInboxData,
  fetchSentData,
  updateInboxData,
  updateSentData,
} from "./mailSlice";

const emailChanger = (str) => {
  let updatedStr = "";
  for (let s of str) {
    if (s === "@" || s === ".") continue;
    updatedStr += s;
  }
  return updatedStr;
};

export const mailHandler = (mailObj) => {
  const { email, senderEmail } = mailObj;
  const receiverEmail = emailChanger(email);
  const sendersEmail = emailChanger(senderEmail);

  return async (dispatch) => {
    const receivedData = async () => {
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${receiverEmail}/Email/received.json`,
        {
          method: "POST",
          body: JSON.stringify(mailObj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        return await res.json();
      } else {
        const data = await res.json();
        let errorMsg = "Failed to send mail";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    };
    const sentData = async () => {
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${sendersEmail}/Email/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(mailObj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(addMail({ ...mailObj, id: data.name }));
      } else {
        const data = await res.json();
        let errorMsg = "Failed to send mail";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    };

    try {
      await receivedData();
      await sentData();
    } catch (error) {
      console.log("mail handler", error.message);
    }
  };
};

export const fetchInbox = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const email = emailChanger(localStorage.getItem("email"));
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${email}/Email/received.json`
      );
      if (res.ok) {
        const data = await res.json();
        if (data === null || undefined) return;
        return data;
      } else {
        const data = await res.json();
        let errorMsg = "No Messages to display";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    };
    try {
      const inboxData = await fetchHandler();
      if (inboxData === null || undefined) return;
      let inboxArr = [];
      for (const key in inboxData) {
        const inbox = {
          ...inboxData[key],
          id: key,
        };
        inboxArr.push(inbox);
      }
      dispatch(fetchInboxData(inboxArr));
    } catch (error) {
      console.log("fetchInbox", error.message);
    }
  };
};
export const fetchSent = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const email = emailChanger(localStorage.getItem("email"));
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${email}/Email/sent.json`
      );
      if (res.ok) {
        const data = await res.json();
        if (data === null || undefined) return;
        return data;
      } else {
        const data = await res.json();
        let errorMsg = "No Messages to display";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    };
    try {
      const sentData = await fetchHandler();
      if (sentData === null || undefined) return;
      let sentArr = [];
      for (const key in sentData) {
        const inbox = {
          ...sentData[key],
          id: key,
        };
        sentArr.push(inbox);
      }
      console.log(sentArr);
      dispatch(fetchSentData(sentArr));
    } catch (error) {
      console.log("fetch sent", error.message);
    }
  };
};

export const updateReadStatus = (mail) => {
  return async (dispatch) => {
    try {
      const email = emailChanger(localStorage.getItem("email"));
      console.log(email);
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${email}/Email/received/${mail.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("success");
        dispatch(fetchInbox());
      } else {
        console.log(res);
        throw new Error("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteInboxMail = (key) => {
  return async (dispatch) => {
    try {
      const userEmail = emailChanger(localStorage.getItem("email"));
      const deleteUrl = `https://mailbox-d40d3-default-rtdb.firebaseio.com/${userEmail}/Email/received/${key}.json`;

      const res = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatch(updateInboxData(key));
      } else {
        const data = await res.json();
        let errorMsg = data.error.message;
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.log("delete inbox", error.message);
    }
  };
};
export const deleteSentMail = (key) => {
  return async (dispatch) => {
    try {
      const userEmail = emailChanger(localStorage.getItem("email"));
      const deleteUrl = `https://mailbox-d40d3-default-rtdb.firebaseio.com/${userEmail}/Email/sent/${key}.json`;

      const res = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatch(updateSentData(key));
      } else {
        const data = await res.json();
        let errorMsg = data.error.message;
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.log("delete sent", error.message);
    }
  };
};
