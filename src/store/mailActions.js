import { addMail } from "./mailSlice";

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
    const receiveData = async () => {
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
      const senderEmail = localStorage.getItem("email");
      const res = await fetch(
        `https://mailbox-d40d3-default-rtdb.firebaseio.com/${senderEmail}/Email/sent.json`,
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
      await sentData();
      await receiveData();
    } catch (error) {
      alert(error.message);
    }
  };
};
