import React from "react";
import styled from "styled-components";

export const Battery = ({ energy, maxEnergy = 10, size }) => {
  const percentage = (energy / maxEnergy) * 100;

  return (
    <BatteryWrapper $percentage={percentage}>
      <BatteryTop $small={size === "small"} />
      <BatteryBody $small={size === "small"}>
        <EnergyFill $percentage={percentage} />
        <GlassOverlay />

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
  filter: ${props => {
    const p = props.$percentage;
    if (p > 70) return "drop-shadow(0 0 12px rgba(168, 213, 186, 0.6))";
    if (p > 40) return "drop-shadow(0 0 12px rgba(107, 94, 117, 0.4))";
    return "drop-shadow(0 0 12px rgba(196, 122, 122, 0.6))";
  }};
`;

const BatteryTop = styled.div`
  width: ${props => props.$small ? '36px' : '52px'};
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
  width: ${props => props.$small ? '68px' : '100px'};
  height: ${props => props.$small ? '110px' : '160px'};
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
  background: linear-gradient(to top, #c47a7a, #f0c060, #a8d5ba);
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  box-shadow: ${props => {
    const p = props.$percentage;
    if (p > 70) return "0 -10px 30px rgba(168, 213, 186, 0.4)";
    if (p > 40) return "0 -10px 30px rgba(107, 94, 117, 0.3)";
    return "0 -10px 30px rgba(196, 122, 122, 0.4)";
  }};
  transition: height 0.7s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -50%;
    width: 200%;
    background: linear-gradient(
      120deg,
      transparent 35%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 65%
    );
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(50%); }
  }
`;

const GlassOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%,rgba(255, 255, 255, 0.05) 50%, transparent 100%);
  pointer-events: none;
`;


