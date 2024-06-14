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
      alert(error.message);
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
      console.log(inboxArr);
      dispatch(fetchInboxData(inboxArr));
    } catch (error) {
      alert(error.message);
    }
  };
};

export const updateReadStatus = (mail) => {
  return async () => {
    try {
      const email = emailChanger(localStorage.getItem("email"));
      console.log(email);
      const res = fetch(
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
        console.log(res);
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
