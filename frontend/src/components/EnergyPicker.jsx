import styled from "styled-components";
import { useUserStore } from "../stores/userStore";

export const EnergyPicker = ({ energyLevel, setEnergyLevel, onNext }) => {
  const username = useUserStore((state) => state.username);

  return (
    <EnergyWrapper>
      <p>Varmt välkommen, <UsernameSpan>{username?.split(" ")[0]}</UsernameSpan>!</p>
      <EnergyTitle>Hur mycket energi har du idag?</EnergyTitle>
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
      {energyLevel && (
        <SelectedDisplay>
          <strong>{energyLevel}</strong>
          <span>/10</span>
        </SelectedDisplay>
      )}
      <NextButton onClick={onNext} disabled={!energyLevel}>Nästa</NextButton>
    </EnergyWrapper>
  );
};

// ======= STYLED COMPONENTS ======= //

const EnergyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;

const UsernameSpan = styled.span`
  font-size: 20px;
  color: var(--color-primary);
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(107, 94, 117, 0.3);
`;

const EnergyTitle = styled.h2`
  text-align: center;
  font-size: clamp(16px, 4vw, 20px);
`;

const EnergyButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 320px;
`;

const EnergyButton = styled.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: ${({ $active }) => ($active ? "var(--color-primary)" : "white")};
  color: ${({ $active }) => ($active ? "white" : "var(--color-text)")};
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
`;

const SelectedDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;

  strong {
    font-size: 52px;
    font-weight: 700;
    line-height: 1;
    color: var(--color-primary);
    text-shadow: 0 0 16px rgba(255, 255, 255, 0.8)
  }

  span {
    font-size: 20px;
    color: var(--color-text);
  }
`;

const NextButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 20px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
