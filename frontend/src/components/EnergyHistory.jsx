import styled from "styled-components";
import { useState } from "react";

export const EnergyGraf = ({ plans }) => {
  const [range, setRange] = useState(7);

  const now = new Date();
  const filtered = plans
    .filter(p => (now - new Date(p.date)) / (1000 * 60 * 60 * 24) <= range)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getBarColor = (energy) => {
    if (energy >= 7) return "#a8d5ba";
    if (energy >= 4) return "#f0c060";
    return "#c47a7a";
  };

  return (
    <GrafWrapper>
      <GrafHeader>
        <GrafTitle>Energiöversikt</GrafTitle>
        <ToggleRow>
          <ToggleButton $active={range === 7} onClick={() => setRange(7)}>Vecka</ToggleButton>
          <ToggleButton $active={range === 30} onClick={() => setRange(30)}>Månad</ToggleButton>
        </ToggleRow>
      </GrafHeader>

      {filtered.length === 0 ? (
        <EmptyGraf>Ingen data för perioden</EmptyGraf>
      ) : (
        <BarsContainer>
          {filtered.map(plan => (
            <BarColumn key={plan._id}>
              <BarWrapper>
                <Bar $height={(plan.currentEnergy / 10) * 100} $color={getBarColor(plan.currentEnergy)} />
              </BarWrapper>
              <BarLabel>{new Date(plan.date).toLocaleDateString("sv-SE", { weekday: "short" })}</BarLabel>
              <BarValue>{plan.currentEnergy}</BarValue>
            </BarColumn>
          ))}
        </BarsContainer>
      )}
    </GrafWrapper>
  );
};

// ======= STYLED COMPONENTS ======= //

const GrafWrapper = styled.div`
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const GrafHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const GrafTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  color: var(--color-text);
`;

const ToggleRow = styled.div`
  display: flex;
  gap: 6px;
`;

const ToggleButton = styled.button`
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: ${props => props.$active ? "var(--color-primary)" : "transparent"};
  color: ${props => props.$active ? "white" : "var(--color-text)"};
  font-size: 13px;
  cursor: pointer;
`;

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  justify-content: space-around;
  overflow-x: auto;
`;

const BarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: 100%;
  height: ${props => props.$height}%;
  background: ${props => props.$color};
  border-radius: 6px 6px 2px 2px;
  transition: height 0.4s ease;
  min-height: 4px;
`;

const BarLabel = styled.span`
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: capitalize;
`;

const BarValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
`;

const EmptyGraf = styled.p`
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
  padding: 24px 0;
`;
