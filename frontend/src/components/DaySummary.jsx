import styled from "styled-components";
import { FloppyDisk, Clover, BatteryLow } from "@phosphor-icons/react";
import { Battery } from "./BatteryComponent";
import { useNavigate } from "react-router";
import { MascotTip } from "./MascotTip";

export const DaySummary = ({ activities, selectedActivities, energyLevel, energyLeft, recovery, onBack, onSave, isSaved }) => {
  const navigate = useNavigate();

  return (
    <BalanceWrapper>
      <h2>Så här ser din dag ut</h2>
      <BatteryWrapper>
        <Battery energy={energyLeft} size="large" />
      </BatteryWrapper>

      <MascotTip energyLeft={energyLeft} recovery={recovery} />

      <QuickList>
        <QuickListTitle>Dina planerade aktiviteter idag:</QuickListTitle>
        <TwoColumnList>
          <Column>
            <ColumnLabel $positive><Clover size={13} weight="fill" /> Ger energi</ColumnLabel>
            {activities.filter(a => selectedActivities.includes(a._id) && a.energyImpact > 0)
              .map(a => <ActivityChip key={a._id} $positive>{a.name}</ActivityChip>)}
          </Column>
          <Column>
            <ColumnLabel><BatteryLow size={13} weight="fill" /> Tar energi</ColumnLabel>
            {activities.filter(a => selectedActivities.includes(a._id) && a.energyImpact < 0)
              .map(a => <ActivityChip key={a._id}>{a.name}</ActivityChip>)}
          </Column>
        </TwoColumnList>
      </QuickList>

      <ShowButtonWrapper>
        <NextButton onClick={onSave} disabled={isSaved}>
          Spara min dag <FloppyDisk size={26} />
        </NextButton>

        {isSaved && <SavedMessage>Din dag är sparad!</SavedMessage>}
        <ButtonRow>
          <SecondaryButton onClick={onBack}> ← Ändra plan</SecondaryButton>
          <SecondaryButton onClick={() => navigate("/history")}>
            Se historik→
          </SecondaryButton>
        </ButtonRow>
      </ShowButtonWrapper>
    </BalanceWrapper >
  );
};

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    text-align: center;
    margin: 0;
  }
`;

const BatteryWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const QuickList = styled.div`
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 16px;
  `;

const QuickListTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  color: var(--color-text);
`;

const TwoColumnList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ColumnLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.$positive ? "var(--color-forest)" : "var(--color-error)"};
  margin: 0 0 4px 0;
`;

const ActivityChip = styled.span`
  display: inline-block;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  background: ${props => props.$positive
    ? "rgba(74, 124, 89, 0.25)"
    : "var(--color-error-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-forest)"
    : "var(--color-error)"
  };
`;

const ShowButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const SecondaryButton = styled.button`
  padding: 12px 24px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: white;
  color: var(--color-text);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  
  &:hover {
    background: #f8fafc;
  }
`;

const NextButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 20px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const SavedMessage = styled.p`
  margin: 0;
  font-size: 15px;
  color: var(--color-forest);
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;