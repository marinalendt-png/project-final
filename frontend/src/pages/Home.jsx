import { LogInForm } from "../components/LoginForm";

export const Home = () => {
  const handleLogin = (userData) => {
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
    }
  };
  return (
    <LogInForm handleLogin={handleLogin} />
  )
};