import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import SignUpPage from "./pages/SignUpPage";

import ComposeMail from "./components/ComposeMail";
import WelcomePage from "./pages/WelcomePage";
import Inbox from "./components/Inbox";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchInbox } from "./store/mailActions";
import InboxMessage from "./components/InboxMessage";
import Sent from "./components/Sent";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import SentMessage from "./components/SentMessage";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

const router = createBrowserRouter([
  { path: "/", element: <SignUpPage /> },
  {
    path: "/welcome",
    element: <AuthenticatedRoutes element={<WelcomePage />} />,

    children: [
      {
        path: "inbox",
        children: [
          {
            index: true,
            element: <AuthenticatedRoutes element={<Inbox />} />,
          },
          {
            path: "inbox-message/:id",
            element: <AuthenticatedRoutes element={<InboxMessage />} />,
          },
        ],
      },
      {
        path: "sent",
        children: [
          {
            index: true,
            element: <AuthenticatedRoutes element={<Sent />} />,
          },
          {
            path: "sent-message/:id",
            element: <AuthenticatedRoutes element={<SentMessage />} />,
          },
        ],
      },
      {
        path: "compose",
        element: <AuthenticatedRoutes element={<ComposeMail />} />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
