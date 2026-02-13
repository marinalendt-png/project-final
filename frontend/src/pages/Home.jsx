import { LogInForm } from "../components/LoginForm";
import { SignUpForm } from "../components/SignUpForm";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import { useUserStore } from "../stores/userStore";

export const Home = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (userData) => {
    if (userData.accessToken) {
      login(userData.accessToken);
      navigate("/daily");
    }
  };

  return (

    <HomeWrapper>
      <AppTitle>Balans</AppTitle>
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

const HomeWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 80px 16px 40px;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const AppTitle = styled.h2`
  font-size: 48px;
  color: white;
  margin: 0;
  font-weight: 300;
  letter-spacing: 4px;

  @media (min-width: 400px) {
    font-size: 64px;
  }
`;

const SubTitle = styled.p`
  color: var(--color-text-light);
  font-size: 20px;
  margin: 0 0 8px 0;
  text-align: center;
`;

const SubText = styled.p`
  color: var(--color-text-light);
  font-size: 14px;

  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px; 
  margin-bottom: 50px;
`;

const OutlinedButton = styled.button`
  padding: 12px 24px;
  border: 2px solid white;
  border-radius: 24px;
  background: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;