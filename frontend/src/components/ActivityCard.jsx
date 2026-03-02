import React from "react";
import styled from "styled-components";
import { PersonSimpleWalk, Leaf, Heart, FlowerLotus, Moon, Barbell, Briefcase, Users, DeviceMobile, Broom, CookingPot, Train, Acorn, Check, Trash, PersonSimple, Sun, Carrot } from "@phosphor-icons/react";

export const activityIcon = {
  "Promenad": PersonSimpleWalk,
  "Yoga": Leaf,
  "Umgås": Heart,
  "Meditation": FlowerLotus,
  "Powernap": Moon,
  "Träning lätt": PersonSimple,
  "Natur": Sun,
  "Jobb": Briefcase,
  "Möte": Users,
  "Skärmtid": DeviceMobile,
  "Städning": Broom,
  "Matlagning": CookingPot,
  "Pendling": Train,
  "Handla": Carrot,
  "Träning tung": Barbell,
}

export const ActivityCard = ({ activity, onClick, selected, onDelete }) => {
  const Icon = activityIcon[activity.name] || Acorn;
  // Drain is to know if an activity takes och gives energy. 
  const isDraining = activity.energyImpact < 0;

  return (
    <CardContainer>
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

      {activity.user && (
        <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(activity._id); }} aria-label={`Radera ${activity.name}`} >
          <Trash size={14} />
        </DeleteButton>
      )}
    </CardContainer >
  );
};

// ======= STYLED COMPONENTS ======= //

const CardContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CardWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.3s ease;

  /* Not chosen style*/
  background: ${props => props.$selected ?
    (props.$drain ? "var(--color-error-light)" : "var(--color-forest-light)")
    : "var(--color-card)"
  };

  border: 2px solid ${props => props.$selected ?
    (props.$drain ? "var(--color-error)" : "var(--color-forest)")
    : "var(--color-border)"
  };

  box-shadow: ${props => props.$selected ?
    "0 4px 12px rgba(0, 0, 0, 0.1)"
    : "0 2px 4px rgba(0, 0, 0, 0.05)"
  };

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.$drain ? "var(--color-error)" : "var(--color-forest)"};
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
  color: ${(props) => (props.$positive ? "var(--color-forest)" : "var(--color-error)")};
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
  background: ${props => props.$drain ? "var(--color-error)" : "var(--color-forest)"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-error);
  opacity: 0.4;
  padding: 2px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;