import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { fetchActivities } from "../api/api";
import styled from "styled-components";

export const DailyPlan = () => {
  const [activities, setActivities] = useState([]); //alla aktiviteter som finns i listan
  const [selectedActivities, setSelectedActivities] = useState([]); // de aktiviteter som användaren väljer. 
  const [energyLevel, setEnergyLevel] = useState(null); // för att kunna välja startenergi-nivå
  const [showForm, setShowForm] = useState(false);

  // SHOWING ALL ACTIVITIES
  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };

    loadActivities();
  }, []);

  // TOGGLING ACTIVITIES
  const toggleActivity = (activityId) => {
    setSelectedActivities((prev) => prev.includes(activityId)
      ? prev.filter((id) => id !== activityId)
      : [...prev, activityId]
    );
  };
  // ADDS NEW ACTIVITY
  // Hämtar värdena från formuläret i FormData, lägger till den nya aktiviteten i listan med id (setActivities) e.target.reset(tömmer formuläret) setShowForm(stänger formuläret. )
  const handleAddActivity = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const energyImpact = Number(formData.get("energyImpact"));

    const newActivity = { name, energyImpact };
    //TODO POST till API + accessToken, just nu läggs den till lokalt. 
    setActivities((prev) => [...prev, { ...newActivity, _id: Date.now().toString() }]);
    e.target.reset();
    setShowForm(false);
  }

  const totalEnergy = activities
    .filter((activity) => selectedActivities.includes(activity._id)) //plockar ut aktiviteter med ett specifikt id (de som blivit klickade på)
    .reduce((sum, activity) => sum + activity.energyImpact, 0); //loopar igenom de valda aktiviteterna och lägger ihop alla energyimpactvärdena. sum börjar på 0 och växer för varje aktivitet. 

  return (
    <>
      <Navbar />
      <EnergyWrapper>
        <h2>Hur mycket energi har du idag</h2>
        <EnergyButtonWrapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <EnergyButton
              key={num}
              $active={energyLevel === num}
              onClick={() => setEnergyLevel(num)}
            >
              {num}
            </EnergyButton>
          ))}
        </EnergyButtonWrapper>
        {energyLevel && <p>Idag: {energyLevel + totalEnergy} / 10</p>}
      </EnergyWrapper>

      <ActivitiesRow>
        <ActivitiesColumn>
          <h3>Tar energi</h3>
          {activities.filter((a) => a.energyImpact < 0).map((activity) => (
            <ActivityCard
              key={activity._id}
              onClick={() => toggleActivity(activity._id)}
              $selected={selectedActivities.includes(activity._id)}
            >
              <strong>{activity.name}</strong>
              <span>{activity.energyImpact} poäng</span>
            </ActivityCard>
          ))}
        </ActivitiesColumn>

        <ActivitiesColumn>
          <h3>Ger energi</h3>
          {activities.filter((a) => a.energyImpact > 0).map((activity) => (
            <ActivityCard
              key={activity._id}
              onClick={() => toggleActivity(activity._id)}
              $selected={selectedActivities.includes(activity._id)}
            >
              <strong>{activity.name}</strong>
              <span>{activity.energyImpact} poäng</span>
            </ActivityCard>
          ))}
        </ActivitiesColumn>
      </ActivitiesRow>

      <ShowButtonWrapper>
        <AddButton onClick={() => setShowForm(!showForm)}>Lägg till aktivitet
        </AddButton>
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
      </ShowButtonWrapper>
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const EnergyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const EnergyButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const EnergyButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background: ${(props) => (props.$active ? "#4a7c59" : "white")}; 
  color: ${(props) => (props.$active ? "white" : "#333")};
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
`;

const ActivitiesRow = styled.div`
  display: flex;
  gap: 30px;
`;

const ActivitiesColumn = styled.div`
  flex: 1;
`;

const ActivityCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: ${(props) => (props.$selected ? "#e8f5e9" : "white")};
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ShowButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const AddButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #ccc;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;
