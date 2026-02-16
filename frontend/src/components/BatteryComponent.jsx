import React from "react";
import styled from "styled-components";

export const Battery = ({ energy, maxEnergy = 10 }) => {
  const percentage = (energy / maxEnergy) * 100;

  return (
    <BatteryWrapper>
      <BatteryTop />
      <BatteryBody>
        <EnergyFill $percentage={percentage} />
        <GlassOverlay />

      </BatteryBody>
      <EnergyText>Energi {energy} / {maxEnergy}</EnergyText>
    </BatteryWrapper>
  );
};

// ======= STYLED COMPONENTS ======= //

const BatteryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BatteryTop = styled.div`
  width: 64px;
  height: 12px;
  background: linear-gradient(to bottom, #e2e8f0, #cbd5e1);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--color-border);
  margin-bottom: -2px;
  z-index: 1;
`;

const BatteryBody = styled.div`
  position: relative;
  width: 120px;
  height: 200px;
  background: linear-gradient(to bottom, #fffbeb, #f5f5f4);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--color-border);
  overflow: hidden;
`;

const EnergyFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.$percentage}%;
  background: ${props => {
    const p = props.$percentage;
    if (p > 70) return "linear-gradient(to top, #A8D5Ba, var(--color-forest))";
    if (p > 40) return "linear-gradient(to top, var(--color-primary), #A8D5BA)";
    return "linear-gradient(to top, #c47a7a, var(--color-primary))";
  }};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 -10px 30px rgba(168, 213, 186, 0.3);
  transition: height 0.7s ease-out;
`;

const GlassOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  pointer-events: none;
`;

const EnergyText = styled.p`
  margin-top: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #334155;
`;
