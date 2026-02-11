import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return children;
};