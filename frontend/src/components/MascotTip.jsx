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
      <BlobWrapper>
        <Blob $mood={mood} $petted={isPetted} onClick={handlePet}>
          <Eyes>
            <Eye $mood={mood} />
            <Eye $mood={mood} />
          </Eyes>
        </Blob>
      </BlobWrapper>
      <TipBubble>{tip}</TipBubble>
    </MascotRow>
  );
};

const MascotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const BlobWrapper = styled.div`
  animation: peekUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
  @keyframes peekUp {
    from { transform: translateY(80px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;

const Blob = styled.div`
  width: 60px;
  height: 60px;
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
  width: 80px;
  height: 80px;
}
`;

const Eyes = styled.div`
  display: flex;
  gap: 10px;
  margin-top: -6px;
`;

const Eye = styled.div`
  width: ${props => props.$mood === "happy" ? "12px" : "9px"};
  height: ${props => {
    if (props.$mood === "happy") return "6px";
    if (props.$mood === "tired") return "4px";
    return "9px";
  }};
  background: white;
  border-radius: ${props => props.$mood === "happy" ? "50% 50% 0 0" : "50%"};
`;

const TipBubble = styled.div`
  align-self: flex-start;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px 12px 12px 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  font-size: 12px;
  max-width: 160px;
  color: var(--color-text);
  line-height: 1.5;
  animation: fadeIn 0.4s ease 0.9s both;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1);   }
  }

  @media (min-width: 400px) {
    font-size: 14px;
    max-width: 220px;
  }
`;