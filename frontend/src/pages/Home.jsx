import { LogInForm } from "../components/LoginForm";
import { SignUpForm } from "../components/SignUpForm";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
      navigate("/daily");
    }
  };

  return (
    <>
      <LogInForm handleLogin={handleLogin} />
      <SignUpForm handleLogin={handleLogin} />
    </>
  )
};