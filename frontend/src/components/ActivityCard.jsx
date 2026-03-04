import styled from "styled-components";
import { PersonSimpleWalk, Leaf, Heart, FlowerLotus, Moon, Barbell, Briefcase, Users, DeviceMobile, Broom, CookingPot, Train, Acorn, Check, Trash, PersonSimple, Sun, Carrot } from "@phosphor-icons/react";

// Connects the activity name with the right icon from external library phosphor-icons. 
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

// Finds the right icon, and if noone is found, it uses Acorn as fallback. 
export const ActivityCard = ({ activity, onClick, selected, onDelete }) => {
  const Icon = activityIcon[activity.name] || Acorn;
  // Drain is to know if an activity takes or gives energy. Controls the colors red/green. 
  const isDraining = activity.energyImpact < 0;

  return (
    <CardContainer>
      <CardWrapper
        onClick={onClick}
        $selected={selected}
        $drain={isDraining}
        aria-pressed={selected}>
        <TopRow>
          <Icon size={24} aria-hidden="true" />
          <strong>{activity.name}</strong>
        </TopRow>
        <EnergyText $positive={activity.energyImpact > 0}>
          {activity.energyImpact > 0 ? "+" : ""}{activity.energyImpact} poäng
        </EnergyText>

        {selected && (
          <CheckIcon $drain={isDraining}>
            <Check size={18} weight="bold" aria-hidden="true" />
          </CheckIcon>
        )}
      </CardWrapper >
      {/* The deletebutton is only shown, if there is a user field, an activity that the user created. */}
      {activity.user && (
        <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(activity._id); }} aria-label={`Radera ${activity.name}`} >
          <Trash size={16} aria-hidden="true" />
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
  position: relative;
  width: 100%;
  gap: 4px;
  padding: 8px;
  min-height: 44px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.3s ease;

  
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
  color: ${(props) => (props.$positive ? "var(--color-forest-dark)" : "var(--color-error-dark)")};
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
  bottom: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-error);
  opacity: 0.65;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }
`;