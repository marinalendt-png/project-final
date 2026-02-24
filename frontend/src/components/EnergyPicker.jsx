import styled from "styled-components";
import { useUserStore } from "../stores/userStore";

export const EnergyPicker = ({ energyLevel, setEnergyLevel, onNext }) => {
  const username = useUserStore((state) => state.username);

  return (
    <EnergyWrapper>
      <p>Varmt välkommen, {username?.split(" ")[0]}!</p>
      <h2>Hur mycket energi har du idag?</h2>
      <EnergyButtonWrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <EnergyButton
            key={num}
            $active={energyLevel === num}
            aria-label={`Välj energinivå ${num}`}
            aria-pressed={energyLevel === num}
            onClick={() => setEnergyLevel(num)}
          >
            {num}
          </EnergyButton>
        ))}
      </EnergyButtonWrapper>
      <span>Idag: <strong style={{ color: "var(--color-primary)", fontSize: "20px" }}>{energyLevel}</strong> /10</span>
      <NextButton onClick={onNext} disabled={!energyLevel}>Nästa</NextButton>
    </EnergyWrapper>
  );
};

// ======= STYLED COMPONENTS ======= //

const EnergyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: var(--color-card);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;

  p {
    font-size: 16px;
  }
`;

const EnergyButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const EnergyButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: ${(props) => (props.$active ? "var(--color-primary)" : "white")};
  color: ${(props) => (props.$active ? "white" : "var(--color-text)")};
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;

  @media (min-width: 400px) {
    width: 44px;
    height: 44px;
    font-size: 15px;
  }
`;

const NextButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 20px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
