import styled from "styled-components";
import { Navigate, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AppContainer>
      <LogOutButton onClick={handleLogout}>Logga ut</LogOutButton>
    </AppContainer>
  )
};

// ===== Styled Components ===== //

const AppContainer = styled.main`
  width: 100%;
  max-width: 500px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;
const LogOutButton = styled.button`
  padding: 8px 16px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  transition: background 0.2s;

  &:hover {
    background: #b71c1c;
  }
`;