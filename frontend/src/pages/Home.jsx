import { LogInForm } from "../components/LoginForm";
import { SignUpForm } from "../components/SignUpForm";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import { useUserStore } from "../stores/userStore";
import { Leaf } from "@phosphor-icons/react";

export const Home = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (userData) => {
    if (userData.accessToken) {
      login(userData.accessToken, userData.name);
      navigate("/daily");
    }
  };

  return (
    <HomeWrapper>
      <AppTitle>
        <Leaf size={56} weight="fill" /> Balans
      </AppTitle>

      <SubTitle>Planera din dag med den energi du har.</SubTitle>
      <SubText>En app för dig som behöver göra en sak i taget och få energin att räcka hela dagen</SubText>

      <ButtonRow>
        <OutlinedButton onClick={() => { setShowLogin(!showLogin); setShowSignup(false); }}>
          Logga in
        </OutlinedButton>
        <OutlinedButton onClick={() => { setShowSignup(!showSignup); setShowLogin(false); }}>
          Skapa konto
        </OutlinedButton>
      </ButtonRow>

      {showLogin && <LogInForm handleLogin={handleLogin} />}
      {showSignup && <SignUpForm handleLogin={handleLogin} />}
    </HomeWrapper>
  );
};

// ======= STYLED COMPONENTS ======= //

const HomeWrapper = styled.main`
  padding: 10vh 16px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: rgba(0, 0, 0, 0.1)
`;

const AppTitle = styled.h1`
  font-size: clamp(36px, 12vw, 64px);
  color: white;
  margin: 0;
  font-weight: 300;
  letter-spacing: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;

const SubTitle = styled.p`
  color: white;
  font-size: 20px;
  margin: 0 0 8px 0;
  text-align: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;

const SubText = styled.p`
  color: white;
  font-size: 14px;
  text-align: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
`;

const OutlinedButton = styled.button`
  padding: 12px 24px;
  min-width: 140px;
  border: 2px solid white;
  border-radius: 24px;
  background: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;