import { login, toggleLoader } from "./authSlice";

const emailChanger = (str) => {
  let updatedStr = "";
  for (let s of str) {
    if (s === "@" || s === ".") continue;
    updatedStr += s;
  }
  return updatedStr;
};

export const authHandler = ({ email, password, loginPage, navigate }) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoader(true));
      let url = loginPage
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAROCB6Q6IkyrcMPvYcw0HzP8-Tsxcs-nk"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAROCB6Q6IkyrcMPvYcw0HzP8-Tsxcs-nk";

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        const updatedEmail = emailChanger(email);
        dispatch(toggleLoader(false));
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", updatedEmail);
        dispatch(login({ authToken: data.idToken, email: updatedEmail }));
        navigate("/welcome");
        console.log("user is Logged In");
      } else {
        dispatch(toggleLoader(false));
        const data = await res.json();
        let errorMsg = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
