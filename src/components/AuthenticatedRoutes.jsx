import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthenticatedRoutes = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? element : null;
};

export default AuthenticatedRoutes;
