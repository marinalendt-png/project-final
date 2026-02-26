import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import { List, X, Leaf, Info, Lightbulb } from "@phosphor-icons/react";
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
    <>
      <Nav>
        <Logo onClick={() => navigate("/daily")}>
          <Leaf size={36} weight="fill" aria-hidden="true" /> Balans
        </Logo>

        <HamburgerButton
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}>
          <List size={28} />
        </HamburgerButton>
      </Nav>

      {menuOpen && <DrawerOverlay onClick={() => setMenuOpen(false)} />}

      <Drawer $open={menuOpen} role="dialog" aria-label="Navigeringsmeny">
        <DrawerTop>
          <DrawerLogo><Leaf size={20} weight="fill" /> Balans</DrawerLogo>
          <CloseDrawerButton onClick={() => setMenuOpen(false)} aria-label="Stäng meny">
            <X size={22} />
          </CloseDrawerButton>
        </DrawerTop>

        <NavLink onClick={() => { navigate("/about"); setMenuOpen(false); }}>
          <Info size={18} /> Om appen
        </NavLink>
        <NavLink onClick={() => { navigate("/tips"); setMenuOpen(false); }}>
          <Lightbulb size={18} /> Tips och länkar
        </NavLink>

        <DrawerBottom>
          <LogOutButton onClick={handleLogout}>Logga ut</LogOutButton>
        </DrawerBottom>
      </Drawer>
    </>
  );
};


// ===== Styled Components ===== //

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 16px 24px;
  position: relative;
`;

const Logo = styled.button`
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
`;


const LogOutButton = styled.button`
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  transition: background 0.2s;

  &:hover {
    background: var(--color-primary-dark);
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
`;

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 90;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 260px;
  background: white;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 24px;
  transform: translateX(${props => props.$open ? "0" : "100%"});
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DrawerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const DrawerLogo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CloseDrawerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  font-size: 16px;
  padding: 16px 0;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: var(--color-primary);
  }
`;

const DrawerBottom = styled.div`
  margin-top: auto;
`;