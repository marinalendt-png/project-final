import React from "react";
import styled from "styled-components";
import { PersonSimpleWalk, Leaf, Heart, FlowerLotus, Moon, Barbell, Briefcase, Users, DeviceMobile, Broom, CookingPot, Train, Acorn, Check } from "@phosphor-icons/react";


const activityIcon = {
  "Promenad": PersonSimpleWalk,
  "Yoga": Leaf,
  "Umgås": Heart,
  "Meditation": FlowerLotus,
  "Powernap": Moon,
  "Träning": Barbell,
  "Jobb": Briefcase,
  "Möte": Users,
  "Skärmtid": DeviceMobile,
  "Städning": Broom,
  "Matlagning": CookingPot,
  "Pendling": Train,
}

export const ActivityCard = ({ activity, onClick, selected }) => {
  const Icon = activityIcon[activity.name] || Acorn;
  // Drain is to know if an activity takes och gives energy. 
  const isDraining = activity.energyImpact < 0;

  return (
    <>
      <CardWrapper onClick={onClick} $selected={selected} $drain={isDraining}>
        <TopRow>
          <Icon size={24} />
          <strong>{activity.name}</strong>
        </TopRow>
        <EnergyText $positive={activity.energyImpact > 0}>
          {activity.energyImpact > 0 ? "+" : ""}{activity.energyImpact} poäng
        </EnergyText>

        {selected && (
          <CheckIcon $drain={isDraining}>
            <Check size={18} weight="bold" />
          </CheckIcon>
        )}
      </CardWrapper >
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const CardWrapper = styled.div`
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3 ease;

      /* Not chosen style*/
      background: ${props => props.$selected ?
    (props.$drain ? "rgba(239, 68, 68, 0.08)" : "rgba(34, 197, 94, 0.08)")
    : "var(--color-card)"
  };

      border: 2px solid ${props => props.$selected ?
    (props.$drain ? "#ef4444" : "#22c55e")
    : "var(--color-border)"
  };

        box-shadow: ${props => props.$selected ?
    "0 4px 12px rgba(0, 0, 0, 0.1)"
    : "0 2px 4px rgba (0, 0, 0, 0.05)"
  };

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-color: ${props => props.$drain ? "#f87171" : "#4ade80"};  
      }

      &:active {
        transform: translateY(0);
      }
  `;

const TopRow = styled.div`
      display: flex;
      align-items: center;
      gap: 6px;
      `;

const EnergyText = styled.span`
  color: ${(props) => (props.$positive ? "var(--color-primary)" : "var(--color-error)")};   
  font-weight: 500;
  font-size: 13px;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${props => props.$drain ? "#ef4444" : "#22c55e"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;