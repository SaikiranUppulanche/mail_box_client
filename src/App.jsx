import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

// import SignUpPage from "./pages/SignUpPage";

import ComposeMail from "./components/ComposeMail";
import WelcomePage from "./pages/WelcomePage";
import Inbox from "./components/Inbox";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInbox } from "./store/mailActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    children: [
      {
        index: true,
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/compose",
        element: <ComposeMail />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
