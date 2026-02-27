import styled from "styled-components";
import { useState } from "react";

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
  const [isPetted, setIsPetted] = useState(false);

  const handlePet = () => {
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 600);
  };

  return (
    <MascotRow>
      <TipBubble $mood={mood}>{tip}</TipBubble>
      <BlobWrapper>
        <Blob $mood={mood} $petted={isPetted} onClick={handlePet}>
          <Eyes>
            <Eye $mood={mood} />
            <Eye $mood={mood} />
          </Eyes>
        </Blob>
      </BlobWrapper>
    </MascotRow>
  );
};

const MascotRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

const BlobWrapper = styled.div`
  margin-top: 14px;
  animation: peekUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
  @keyframes peekUp {
    from { transform: translateY(80px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;

const Blob = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => {
    if (props.$mood === "happy") return "var(--color-forest)";
    if (props.$mood === "tired") return "var(--color-error)";
    return "var(--color-primary)";
  }};
  border-radius: 58% 42% 52% 48% / 54% 48% 52% 46%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: wobble ${props =>
    props.$mood === "happy" ? "3s" :
      props.$mood === "tired" ? "10s" : "6s"
  } linear infinite ${props => props.$petted ? ", jump 0.5s ease" : ""};

@keyframes wobble {
  0%   { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
  25%  { border-radius: 60% 40% 40% 60% / 40% 60% 30% 70%; }
  50%  { border-radius: 60% 40% 60% 40% / 30% 70% 40% 60%; }
  75%  { border-radius: 40% 60% 40% 60% / 70% 40% 60% 30%; }
  100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
}

@keyframes jump {
  0%   { transform: translateY(0); }
  35%  { transform: translateY(-18px); }
  65%  { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}

@media (min-width: 400px) {
  width: 100px;
  height: 100px;
}
`;

const Eyes = styled.div`
  display: flex;
  gap: 10px;
`;

const Eye = styled.div`
  width: ${props => props.$mood === "happy" ? "16px" : props.$mood === "tired" ? "13px" : "11px"};
  height: ${props => {
    if (props.$mood === "happy") return "10px";
    if (props.$mood === "tired") return "4px";
    return "11px";
  }};
  background: white;
  border-radius: ${props => props.$mood === "happy" ? "50% 50% 0 0" : "50%"};
`;


const TipBubble = styled.div`
  align-self: stretch;
  position: relative;
  background: ${props => {
    if (props.$mood === "happy") return "rgba(74, 124, 89, 0.1)";
    if (props.$mood === "tired") return "rgba(196, 122, 122, 0.1)";
    return "rgba(107, 94, 117, 0.08)";
  }};
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 14px 18px;
  font-size: 15px;
  color: var(--color-text);
  line-height: 1.6;
  animation: fadeIn 0.4s ease 0.9s both;

  &::before {
    content: '';
    position: absolute;
    bottom: -11px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-top: 11px solid var(--color-border);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid var(--color-card);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1);   }
  }
`;