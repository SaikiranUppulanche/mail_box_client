import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import SignUpPage from "./pages/SignUpPage";
// import WelocmePage from "./pages/WelocmePage";
import ComposeMail from "./components/ComposeMail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
  {
    path: "/welcome",
    element: <ComposeMail />,
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
