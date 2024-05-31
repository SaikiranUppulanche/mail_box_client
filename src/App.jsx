import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import SignUpPage from "./pages/SignUpPage";
import WelocmePage from "./pages/WelocmePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
  {
    path: "/welcome",
    element: <WelocmePage />,
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
