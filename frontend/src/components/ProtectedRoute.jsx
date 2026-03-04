import { Navigate } from "react-router";

// This file checks if there is an accessToken in localstorage. If not, the user is sent back to login page. If yes, the protected page will be rendered. Its used in App.jsx around the pages daily, history, about and tips. 
export const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return children;
};