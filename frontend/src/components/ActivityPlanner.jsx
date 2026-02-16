import styled from "styled-components";
import { ActivityCard } from "./ActivityCard";
import { Battery } from "./BatteryComponent";

export const ActivityPlanner = ({ activities, selectedActivities, energyLeft, batteryPulse, toggleActivity, showForm, setShowForm, handleAddActivity, onNext }) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Planera din dag</h2>
      <BatteryWrapper $pulse={batteryPulse}>
        <Battery energy={energyLeft} />
      </BatteryWrapper>
      <ActivityTitle>Lägg till aktiviteter för din dag. Klicka i rutorna nedan</ActivityTitle>

      <ActivitiesRow>
        <ActivitiesColumn>
          <ColumnHeader>Tar energi</ColumnHeader>
          {activities.filter((a) => a.energyImpact < 0).map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              selected={selectedActivities.includes(activity._id)}
              onClick={() => toggleActivity(activity._id)}
            />
          ))}
        </ActivitiesColumn>

        <ActivitiesColumn>
          <ColumnHeader>Ger energi</ColumnHeader>
          {activities.filter((a) => a.energyImpact > 0).map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              selected={selectedActivities.includes(activity._id)}
              onClick={() => toggleActivity(activity._id)}
            />
          ))}
        </ActivitiesColumn>
      </ActivitiesRow>

      {showForm && (
        <AddForm onSubmit={handleAddActivity}>
          <AddInput
            type="text"
            placeholder="Aktivitetsnamn"
            name="name"
            required
          />
          <AddInput
            type="number"
            placeholder="Energipoäng (t.ex. -2 eller 3)"
            name="energyImpact"
            min="-3"
            max="3"
            required
          />
          <AddButton type="submit">Spara</AddButton>
        </AddForm>
      )}
      <ShowButtonWrapper>
        <NextButton onClick={onNext}>Se min dag</NextButton>
      </ShowButtonWrapper>
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const BatteryWrapper = styled.div`
      display: flex;
      justify-content: center;
      margin: 8px 0;

      ${props => props.$pulse && `
        animation: batteryPulse 0.4s ease-out;
        `}
        
      @keyframes batteryPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); filter: drop-shadow(0 0  20px rgba(168, 213, 186, 0.6)); }
      100% { transform: scale(1); }
      }
    `;

const ActivityTitle = styled.h3`
    text-align: center;
    font-size: 14px;
`;

const ActivitiesRow = styled.div`
      display: flex;
      gap: 16px;
      margin-top: 16px;
      `;

const ActivitiesColumn = styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      `;

const ColumnHeader = styled.h3`
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 6px;
      text-align: center;
      `;

const ShowButtonWrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-top: 20px;
      `;

const NextButton = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 20px;
    background: var(--color-primary);
    color: white;
    cursor: pointer;
    font-size: 16px;
`;

const AddButton = styled.button`
      padding: 12px 24px;
      border: 1px solid var(--color-border) ;
      border-radius: 20px;
      background: white;
      cursor: pointer;
      font-size: 16px;
      `;

const AddForm = styled.form`
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 300px;
      `;

const AddInput = styled.input`
      padding: 10px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      font-size: 14px;
      `;