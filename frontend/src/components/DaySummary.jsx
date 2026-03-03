import styled, { keyframes } from "styled-components";
import { FloppyDisk, Clover, BatteryLow, CheckCircle, ArrowLeft, ArrowRight, Acorn } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { MascotTip } from "./MascotTip";
import { activityIcon } from "./ActivityCard";

export const DaySummary = ({ activities, selectedActivities, energyLevel, energyLeft, onBack, onSave, isSaved, saveError }) => {
  const navigate = useNavigate();

  return (
    <BalanceWrapper>
      <SummaryTitle>Så här ser din dag ut</SummaryTitle>

      <MascotTip energyLeft={energyLeft} />

      <EnergyRow>
        <EnergyItem>
          <span>Startenergi</span>
          <strong>{energyLevel}</strong>
        </EnergyItem>
        <ArrowSpacer>
          <ArrowRight size={16} aria-hidden="true" />
        </ArrowSpacer>
        <EnergyItem>
          <span>Energi kvar</span>
          <EnergyValue $low={energyLeft < 3}>
            {energyLeft}
          </EnergyValue>
        </EnergyItem>
      </EnergyRow>

      <QuickList>
        <QuickListTitle>Dina planerade aktiviteter idag:</QuickListTitle>
        <TwoColumnList>
          <Column>
            <ColumnLabel $positive><Clover size={13} weight="fill" aria-hidden="true" /> Ger energi</ColumnLabel>
            {activities.filter(a => selectedActivities.includes(a._id) && a.energyImpact > 0)
              .map(a => {
                const Icon = activityIcon[a.name] || Acorn;
                return (
                  <ActivityChip key={a._id} $positive>
                    <Icon size={13} aria-hidden="true" /> {a.name}
                  </ActivityChip>
                );
              })}
          </Column>
          <Column>
            <ColumnLabel><BatteryLow size={13} weight="fill" aria-hidden="true" /> Tar energi</ColumnLabel>
            {activities.filter(a => selectedActivities.includes(a._id) && a.energyImpact < 0)
              .map(a => {
                const Icon = activityIcon[a.name] || Acorn;
                return (
                  <ActivityChip key={a._id}>
                    <Icon size={13} aria-hidden="true" /> {a.name}
                  </ActivityChip>
                );
              })}
          </Column>
        </TwoColumnList>
      </QuickList>

      <ShowButtonWrapper>
        {saveError && <ErrorText>{saveError}</ErrorText>}
        <NextButton onClick={onSave} disabled={isSaved} $saved={isSaved}>
          {isSaved ? <>Sparad! <CheckCircle size={26} weight="fill" aria-hidden="true" /></> : <>Spara min dag <FloppyDisk size={26} aria-hidden="true" /></>}
        </NextButton>

        <ButtonRow>
          <SecondaryButton onClick={onBack}>
            <ArrowLeft size={16} aria-hidden="true" /> Ändra plan
          </SecondaryButton>
          <SecondaryButton $forward onClick={() => navigate("/history")}>
            Se historik <ArrowRight size={16} aria-hidden="true" />
          </SecondaryButton>
        </ButtonRow>
      </ShowButtonWrapper>
    </BalanceWrapper >
  );
};

// ======== KEYFRAMES ======= //

const savedPop = keyframes`
  0% { transform: scale(0.85); }
  100% { transform: scale(1); }
`;


// ======= STYLED COMPONENTS ======= //

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SummaryTitle = styled.h2`
  text-align: center;
  margin: 0;
`;

const EnergyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--color-glass-card);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
`;

const EnergyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  span {
    font-size: 12px;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  strong {
    font-size: 22px;
  }
`;

const ArrowSpacer = styled.span`
  margin-top: 20px;
`;

const EnergyValue = styled.strong`
  font-size: 22px;
  color: ${props => props.$low ? "var(--color-error-dark)" : "var(--color-forest-dark)"};
`;

const QuickList = styled.div`
  background: var(--color-glass-card);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(6px);
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
  flex-direction: column;
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
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.$positive ? "var(--color-forest-dark)" : "var(--color-error-dark)"};
  margin: 0 0 4px 0;
`;

const ActivityChip = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  background: ${props => props.$positive
    ? "var(--color-forest-light)"
    : "var(--color-error-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-forest)"
    : "var(--color-error-dark)"
  };
`;

const ShowButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ErrorText = styled.p`
  color: var(--color-error-dark);
  font-size: 14px;
  text-align: center;
  margin: 0;
`;

const NextButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 20px;
  width: 100%;
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.$saved ? "var(--color-forest)" : "var(--color-primary)"};
  transition: background 0.3s ease;
  ${props => props.$saved && `animation: ${savedPop} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);`}

  &:disabled {
    opacity: 1;
    cursor: default;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
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