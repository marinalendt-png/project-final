import styled, { keyframes } from "styled-components";
import { EnergyBlob } from "./Mascot";

const getTip = (energyLeft, recovery) => {
  if (energyLeft < 2)
    return "Tuff dag framför dig! Försök lägga in en vila tidigt.";
  if (recovery === 0)
    return "Du har inga återhämtande aktiviteter - lägg till en!";
  if (energyLeft >= 7)
    return "Fin energibalans! Du har gott om utrymme kvar idag.";
  return "Lagom balanserat - lyssna på kroppen under dagen.";
};

export const MascotTip = ({ energyLeft, recovery }) => {
  const tip = getTip(energyLeft, recovery);
  const mood = energyLeft >= 7 ? "happy" : energyLeft >= 3 ? "okay" : "tired";

  return (
    <MascotRow>
      <EnergyBlob energy={energyLeft} />
      <TipBubble $mood={mood}>{tip}</TipBubble>
    </MascotRow>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1);   }
`;

const MascotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;

const TipBubble = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  background: ${props => {
    if (props.$mood === "happy") return "rgba(168, 213, 186, 0.15)";
    if (props.$mood === "tired") return "rgba(196, 122, 122, 0.1)";
    return "rgba(240, 192, 96, 0.1)";
  }};
  backdrop-filter: blur(8px);
  border: 1.5px solid ${props => {
    if (props.$mood === "happy") return "rgba(106, 175, 140, 0.8)";
    if (props.$mood === "tired") return "rgba(196, 122, 122, 0.8)";
    return "rgba(240, 192, 96, 0.9)";
  }};
  border-radius: 12px 12px 12px 0;
  box-shadow: ${props => {
    if (props.$mood === "happy") return "0 6px 20px rgba(106, 175, 140, 0.35)";
    if (props.$mood === "tired") return "0 6px 20px rgba(196, 122, 122, 0.35)";
    return "0 6px 20px rgba(240, 192, 96, 0.4)";
  }};
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.5;
  animation: ${fadeIn} 0.4s ease 0.9s both;
`;
