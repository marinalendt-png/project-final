import React from "react";
import styled from "styled-components";
import { PersonSimpleWalk, Leaf, Heart, FlowerLotus, Moon, Barbell, Briefcase, Users, DeviceMobile, Broom, CookingPot, Train, Acorn } from "@phosphor-icons/react";


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

export const ActivityCard = ({ activity, onClick }) => {
  const Icon = activityIcon[activity.name] || Acorn;

  return (
    <>
      <CardWrapper onClick={onClick}>
        <TopRow>
          <Icon size={24} />
          <strong>{activity.name}</strong>
        </TopRow>
        <EnergyText $positive={activity.energyImpact > 0}>
          {activity.energyImpact} poäng
        </EnergyText>
      </CardWrapper >
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const CardWrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 8px;
      background: ${(props) => (props.$selected ? "var(--color-card-selected)" : "var(--color-card)")};
      border: 1px solid var(--color-border);
      cursor: pointer;
      `;

const TopRow = styled.div`
      display: flex;
      align-items: center;
      gap: 6px;
      `;

const EnergyText = styled.span`
  color: ${(props) => (props.$positive ? "var(--color-primary)" : "var(--color-error)")};   
`;