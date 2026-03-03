import { SignUpForm } from "../components/SignUpForm";
import { useNavigate } from "react-router";
import { useUserStore } from "../stores/userStore";

export const Register = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const handleLogin = (userData) => {
    if (userData.accessToken) {
      login(userData.accessToken, userData.name);
      navigate("/daily");
    }
  };

  return (
    <SignUpForm handleLogin={handleLogin} />
  );
};