import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const WelcomePage = () => {
  return (
    <>
      <header>
        <h1 className="border border-b-2 text-pretty font-medium text-xl p-4">
          Welcome to Mail Box Client{" "}
        </h1>
      </header>
      <div className="flex flex-row mt-10">
        <nav className="w-[20%]">
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
