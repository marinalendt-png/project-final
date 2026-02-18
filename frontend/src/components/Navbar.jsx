import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import { List, X, Leaf } from "@phosphor-icons/react";
import { useUserStore } from "../stores/userStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <Nav>
      <Logo onClick={() => navigate("/daily")}>
        <Leaf size={36} weight="fill" /> Balans
      </Logo>

      <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <List size={24} />}
      </HamburgerButton>

      <RightSection $open={menuOpen}>
        <NavLink onClick={() => navigate("/about")}>Om appen</NavLink>
        <NavLink onClick={() => navigate("/tips")}>Tips och råd</NavLink>
        <LogOutButton onClick={handleLogout}>Logga ut</LogOutButton>
      </RightSection>
    </Nav>
  )
};

// ===== Styled Components ===== //

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  position: relative;
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;

  @media (min-width: 768px) {
  display: none;
  }
`;

const Logo = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const RightSection = styled.div`
/* Mobil: dropdown-menu */
  display: ${props => props.$open ? "flex" : "none"};
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  padding: 16px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 12px 12px;
  z-index: 50;

  /* Desktop: ordinary row */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    position: static;
    box-shadow: none;
    padding: 0;
    gap: 24px;
    align-items: center; 
    }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: var(--color-primary);
  }
`;

const LogOutButton = styled.button`
  padding: 8px 16px;
  background: var(--color-primary);
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