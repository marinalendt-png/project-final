import styled from "styled-components";
import { useState } from "react";
import { Lightning } from "@phosphor-icons/react";

// The user can choose from 7 or 30 days, and range controls with plans that will show. 
export const EnergyGraf = ({ plans }) => {
  const [range, setRange] = useState(7);

  // calculates witch plans to show, sorting on the oldest first. 
  const now = new Date();
  const filtered = plans
    .filter(p => (now - new Date(p.date)) / (1000 * 60 * 60 * 24) <= range)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // calculates ISO-weeknumbers
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  // different colors depending on energylevel
  const getBarColor = (energy) => {
    if (energy >= 7) return "var(--color-energy-high)";
    if (energy >= 4) return "var(--color-energy-mid)";
    return "var(--color-error)";
  };

  return (
    <GrafWrapper>
      <GrafHeader>
        <div>
          <GrafTitle>Energiöversikt</GrafTitle>
          {range === 7 && <WeekLabel>Vecka {getWeekNumber(now)}</WeekLabel>}
        </div>
        <ToggleRow>
          <ToggleButton $active={range === 7} onClick={() => setRange(7)} aria-pressed={range === 7}>Vecka</ToggleButton>
          <ToggleButton $active={range === 30} onClick={() => setRange(30)} aria-pressed={range === 30}>Månad</ToggleButton>
        </ToggleRow>
      </GrafHeader>

      {filtered.length === 0 ? (
        <EmptyGraf>Ingen data för perioden</EmptyGraf>
      ) : (
        <BarsContainer role="img" aria-label="Energiöversikt som stapeldiagram">
          {filtered.map(plan => (
            <BarColumn key={plan._id}>
              <BarWrapper>
                <Bar $height={(plan.currentEnergy / 10) * 100} $color={getBarColor(plan.currentEnergy)} />
              </BarWrapper>
              <BarLabel>{new Date(plan.date).toLocaleDateString("sv-SE", { weekday: "short" })}</BarLabel>
              <BarValue><Lightning size={11} weight="fill" aria-hidden="true" />{plan.currentEnergy}</BarValue>
            </BarColumn>
          ))}
        </BarsContainer>
      )}
    </GrafWrapper>
  );
};

// ======= STYLED COMPONENTS ======= //

const GrafWrapper = styled.div`
  background: var(--color-glass-card);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(6px);
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

const WeekLabel = styled.span`
  font-size: 11px;
  color: var(--color-text-muted);
  display: block;
  margin-top: 2px;
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

// If many days, you can scroll horizontally with overflow-x. 
const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  justify-content: flex-start;
  overflow-x: auto;
`;

const BarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 36px;
  flex-shrink: 0;
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
`;

// The pile that calculates currentEnergy/10 * 100, ex 70%. 
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
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
`;

const EmptyGraf = styled.p`
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
  padding: 24px 0;
`;
