import { SignUpForm } from "../components/SignUpForm";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
      navigate("/daily");
    }
  };

  return (
    <SignUpForm handleLogin={handleLogin} />
  )
};