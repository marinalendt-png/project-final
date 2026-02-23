import React from "react";
import styled from "styled-components";

export const Battery = ({ energy, maxEnergy = 10, size }) => {
  const percentage = (energy / maxEnergy) * 100;

  return (
    <BatteryWrapper>
      <BatteryTop $small={size === "small"} />
      <BatteryBody $small={size === "small"}>
        <EnergyFill $percentage={percentage} />
        <GlassOverlay />
        <EnergyText>Energi {energy} / {maxEnergy}</EnergyText>
      </BatteryBody>

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
  width: ${props => props.$small ? '42px' : '64px'};
  height: 14px;
  background: linear-gradient(
    to bottom,
    #f0f0f0 0%,
    #d4d4d4 40%,
    #b8b8b8 100%
  );
  border-radius: 8px 8px 0 0;
  box-shadow:
    0 -2px 4px rgba(0, 0, 0, 0.1),
    inset 0 2px 3px rgba(255, 255, 255, 0.6);
  border: 2px solid var(--color-border);
  margin-bottom: -2px;
  z-index: 1;
`;

const BatteryBody = styled.div`
 position: relative;
  width: ${props => props.$small ? '80px' : '120px'};
  height: ${props => props.$small ? '130px' : '200px'};
  background: linear-gradient(
    120deg,
    #f5f5f4 0%,
    #fffbeb 40%,
    #e8e5e0 100%
  );
  border-radius: 24px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    inset -4px -4px 10px rgba(0, 0, 0, 0.08),
    inset 4px 4px 10px rgba(255, 255, 255, 0.9);
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

    &::after {
    content: '';
    position: absolute;
    top: -12px;
    left: -20%;
    width: 140%;
    height: 24px;
    background: inherit;
    border-radius: 50%;
    animation: wave 2.5s ease-in-out infinite;
  }

  @keyframes wave {
    0%, 100% { transform: translateX(-5%) rotate(-1deg); }
    50% { transform: translateX(5%) rotate(1deg); }
  }
`;

const GlassOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%,rgba(255, 255, 255, 0.05) 50%, transparent 100%);
  pointer-events: none;
`;

const EnergyText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 700;
  color: #334155;
  z-index: 2;
  margin: 0;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

