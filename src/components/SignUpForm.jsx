import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./Loader";
import { authHandler } from "../store/authActions";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loginPage, setLoginPage] = useState(false);
  const loader = useSelector((state) => state.auth.loader);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoginPage(true);
  }, []);

  const switchLoginHandler = () => {
    setLoginPage((prevState) => !prevState);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleBlur = (field) => {
    if (field === "email" && !email) {
      setEmailError("Email is required");
    } else if (field === "password" && !password) {
      setPasswordError("Password is required");
    } else if (field === "confirmPassword" && !confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredPassword = password;
    const confirmedPassword = !loginPage && confirmPassword;

    if (
      !loginPage &&
      (enteredPassword !== confirmedPassword || enteredPassword.length < 8)
    ) {
      return alert("Please enter correct password");
    }
    dispatch(authHandler({ email, password, loginPage, navigate }));

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="h-screen flex flex-col justify-center items-center ">
          <form
            onSubmit={handleSubmit}
            className="px-2 w-1/2 h-[65vh] flex max-w-sm py-12 flex-col items-center border-2 border-gray-400 rounded-md shadow-lg "
          >
            <h3 className="text-3xl pb-5">{loginPage ? "Login" : "Sign Up"}</h3>
            <input
              className="w-8/12 h-4 p-3 m-2 border-2 rounded-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onBlur={() => handleBlur("email")}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <input
              className="w-8/12 h-4 p-3 m-2 border-2 rounded-md"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onBlur={() => handleBlur("password")}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            {!loginPage && (
              <>
                <input
                  className="w-8/12 h-4 p-3 m-2 border-2 rounded-md"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                  onBlur={() => handleBlur("confirmPassword")}
                />
                {confirmPasswordError && (
                  <p className="text-red-500">{confirmPasswordError}</p>
                )}
              </>
            )}

            <button
              className="bg-sky-500 text-white w-8/12 h-10 rounded-full mt-8 mb-4"
              type="submit"
            >
              {loginPage ? "Login" : "Sign Up"}
              {loader && ""}
            </button>
            <button className=" text-blue-500 underline">
              {loginPage && <Link to="/forget-password">Forget Password</Link>}
            </button>
          </form>

          <button
            onClick={switchLoginHandler}
            className=" border-1 w-1/4 mt-4  border-slate-700 bg-sky-100 rounded-md py-4 px-10"
            type="button"
          >
            {loginPage
              ? "Don't have an account? Sign Up"
              : " Have an Account? Login"}
          </button>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
