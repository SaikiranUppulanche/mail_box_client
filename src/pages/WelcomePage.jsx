import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchInbox } from "../store/mailActions";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("running");
    dispatch(fetchInbox());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <header className="flex items-center justify-between border border-b-2 ">
        <h1 className=" text-pretty font-medium text-xl p-4">
          Welcome to Mail Box Client{" "}
        </h1>
        <button
          onClick={handleLogout}
          className=" py-2 px-4 me-8 bg-red-600 rounded text-stone-50 font-semibold"
        >
          Log Out
        </button>
      </header>
      <div className="flex flex-row mt-10">
        <nav className="w-80">
          <SideBar />
        </nav>
        <main className="w-[80%] ms-5 me-10 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default WelcomePage;
