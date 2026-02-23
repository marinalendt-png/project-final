import styled from "styled-components";
import { Lightning, Calendar, Flag, Sparkle, RocketLaunch, Siren, Smiley, ShootingStar, FloppyDisk, ArrowRight, ListBullets } from "@phosphor-icons/react";
import { Battery } from "./BatteryComponent";
import { useNavigate } from "react-router";

export const DaySummary = ({ activities, selectedActivities, energyLevel, energyLeft, recovery, onBack, onSave, isSaved }) => {
  const navigate = useNavigate();

  return (
    <BalanceWrapper>
      <h2>Så här ser din dag ut</h2>
      <BatteryWrapper>
        <Battery energy={energyLeft} size="large" />
      </BatteryWrapper>

      <BalanceAssessment $level={
        energyLeft < 2 ? "critical" :
          energyLeft < 6 ? "moderate" :
            energyLeft < 8 ? "good" : "excellent"
      }>
        <AssessmentIcon>
          {energyLeft < 2 ? <Siren size={32} /> :
            energyLeft < 6 ? <Smiley size={32} /> :
              energyLeft < 8 ? <ShootingStar size={32} /> : <RocketLaunch size={32} />}
        </AssessmentIcon>
        <AssessmentText>
          <strong>
            {energyLeft < 2 ? "Du behöver dra ner på tempot!" :
              energyLeft < 6 ? "Lagom balanserad planering" :
                energyLeft < 8 ? "Bra energi" : "Mycket energi över"}
          </strong>
          <p>
            {energyLeft < 2 ?
              "Du har planerat väldigt mycket. Överväg att ta bort några aktiviteter för att undvika utmattning." :
              energyLeft < 6 ?
                "Bra balans mellan aktiviteter och återhämtning. Du kommer känna dig nöjd men lagom trött" :
                energyLeft < 8 ?
                  "Du har god energi kvar efter dagen. Perfekt för eventuellt produktivitet, eller återhämtning" :
                  "Du har mycket energi över. Du kan lägga till flera aktiviteter, eller bara känna dig nöjd och njuta av övertiden"}
          </p>
        </AssessmentText>
      </BalanceAssessment>

      <QuickList>
        <QuickListTitle>Dina planerade aktiviteter idag:</QuickListTitle>
        <ActivityChips>
          {activities.filter((a) => selectedActivities.includes(a._id))
            .map((activity) => (
              <ActivityChip key={activity._id} $positive={activity.energyImpact > 0}>
                {activity.name} ({activity.energyImpact > 0 ? "+" : ""}{activity.energyImpact})
              </ActivityChip>
            ))}
        </ActivityChips>
      </QuickList>

      <EnergyFlow>
        <FlowNode>
          <Lightning size={28} />
          <FlowValue>{energyLevel}</FlowValue>
          <FlowLabel>Startenergi</FlowLabel>
        </FlowNode>
        <ArrowRight size={20} color="var(--color-text-muted)" />

        <FlowNode>
          <ListBullets size={28} />
          <FlowValue>{selectedActivities.length}</FlowValue>
          <FlowLabel>aktiviteter</FlowLabel>
        </FlowNode>
        <ArrowRight size={20} color="var(--color-text-muted)" />

        <FlowNode>
          <Flag size={28} />
          <FlowValue>{energyLeft}</FlowValue>
          <FlowLabel>Slutnenergi</FlowLabel>
        </FlowNode>
      </EnergyFlow>

      <ShowButtonWrapper>
        <SecondaryButton onClick={onBack}> ← Ändra plan</SecondaryButton>
        <NextButton onClick={onSave} disabled={isSaved}>
          Spara min dag <FloppyDisk size={26} />
        </NextButton>
        {isSaved && <SavedMessage>Din dag är sparad!</SavedMessage>}
        <SecondaryButton onClick={() => navigate("/history")}>
          Se historik→
        </SecondaryButton>
      </ShowButtonWrapper>
    </BalanceWrapper>
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
  margin: 20px 0;
`;

const EnergyFlow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
`;

const FlowNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 12px;
  background: white;
  border: 1px solid ${props => props.$end ? "var(--color-error)" : "var(--color-border)"};
  flex: 1;
`;

const FlowValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--color-text);
`;

const FlowLabel = styled.div`
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
`;

const BalanceAssessment = styled.div`
  background: ${props => {
    switch (props.$level) {
      case 'critical': return "var(--color-error-light)";
      case 'moderate': return "rgba(212, 165, 116, 0.2)";
      case 'good': return "rgba(107, 155, 210, 0.15)";
      case 'excellent': return "var(--color-success-light)";
      default: return "var(--color-card)";
    }
  }};
  border: 2px solid ${props => {
    switch (props.$level) {
      case 'critical': return "var(--color-error)";
      case 'moderate': return "var(--color-warning)";
      case 'good': return "var(--color-info)";
      case 'excellent': return "var(--color-success)";
      default: return '#e2e8f0';
    }
  }};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const AssessmentIcon = styled.div`
  font-size: 40px;
  flex-shrink: 0;
`;

const AssessmentText = styled.div`
  flex: 1;
  
  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--color-text);
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text);
  }
`;

const QuickList = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
`;

const QuickListTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  color: var(--color-text);
`;

const ActivityChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ActivityChip = styled.span`
  display: inline-block;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  background: ${props => props.$positive
    ? "var(--color-success-light)"
    : "var(--color-error-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-success)"
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
  flex: 1;
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