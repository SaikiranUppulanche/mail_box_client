import { addMail, fetchInboxData } from "./mailSlice";

const emailChanger = (str) => {
  let updatedStr = "";
  for (let s of str) {
    if (s === "@" || s === ".") continue;
    updatedStr += s;
  }
  return updatedStr;
};

export const mailHandler = (mailObj) => {
  console.log(mailObj);
  const { email } = mailObj;
  const receiverEmail = emailChanger(email);

  return async (dispatch) => {
    const sentData = async () => {
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${receiverEmail}/Email/sent.json`,
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
      } else {
        const data = await res.json();
        let errorMsg = "Failed to send mail";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    };
    const receivedData = async () => {
      const senderEmail = localStorage.getItem("email");
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${senderEmail}/Email/received.json`,
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
        dispatch(addMail(mailObj));
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
      alert(error.message);
    }
  };
};

export const fetchInbox = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const email = localStorage.getItem("email");
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${email}/Email/sent.json`
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
      } else {
        const data = await res.json();
        let errorMsg = "Failed to fetch inbox";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    };
    try {
      const inboxData = await fetchHandler();
      console.log(inboxData);
      let inboxArr = [];
      for (const key in inboxData) {
        const inbox = {
          ...inboxData[key],
          key: key,
        };
        inboxArr.push(inbox);
      }
      console.log(inboxArr);
      dispatch(fetchInboxData(inboxArr));
    } catch (error) {
      alert(error.message);
    }
  };
};
