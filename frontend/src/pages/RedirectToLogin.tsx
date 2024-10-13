import { Navigate, useLocation } from "react-router-dom";

const RedirectToLogin = () => {
  const location = useLocation();
  return <Navigate to={`/login?path_from=${location.pathname}`} />;
};

export default RedirectToLogin;
