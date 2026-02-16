import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { fetchActivities } from "../api/api";
import styled from "styled-components";
import { ActivityCard } from "../components/ActivityCard";
import { Lightning, Calendar, Flag, Sparkle, RocketLaunch, Siren, Smiley, ShootingStar } from "@phosphor-icons/react";
import { Battery } from "../components/BatteryComponent";

export const DailyPlan = () => {
  const [activities, setActivities] = useState([]); //alla aktiviteter som finns i listan
  const [selectedActivities, setSelectedActivities] = useState([]); // de aktiviteter som användaren väljer. 
  const [energyLevel, setEnergyLevel] = useState(null); // för att kunna välja startenergi-nivå
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [batteryPulse, setBatteryPulse] = useState(false);

  // SHOWING ALL ACTIVITIES
  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };

    loadActivities();
  }, []);

  // TOGGLING ACTIVITIES + making the battery pulsate
  const toggleActivity = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
    setBatteryPulse(true);
    setTimeout(() => setBatteryPulse(false), 400);
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

  // TOTAL AMOUNT OF ENERGY PER DAY 
  const totalEnergy = activities
    .filter((activity) => selectedActivities.includes(activity._id)) //plockar ut aktiviteter med ett specifikt id (de som blivit klickade på)
    .reduce((sum, activity) => sum + activity.energyImpact, 0); //loopar igenom de valda aktiviteterna och lägger ihop alla energyimpactvärdena. sum börjar på 0 och växer för varje aktivitet. 

  // ENERGY LEFT PER DAY (startenergy - the chosen activities that takes energy)
  const energyLeft = energyLevel
    ? energyLevel + activities
      .filter((a) => selectedActivities.includes(a._id))
      .reduce((sum, a) => sum + a.energyImpact, 0)
    : 0;

  // RECOVERY LEFT PER DAY (the sum of the chosen activities that gives energy)
  const recovery = activities
    .filter((a) => selectedActivities.includes(a._id) && a.energyImpact > 0)
    .reduce((sum, a) => sum + a.energyImpact, 0);

  return (
    <>
      <Navbar />
      <PageWrapper>

        {step === 1 && (
          <EnergyWrapper>
            <h2>Hur mycket energi har du idag?</h2>
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
            <span style={{ color: "white" }}>Idag: <strong style={{ color: "var(--color-primary)", fontSize: "20px" }}>{energyLevel}</strong> /10</span>
            <NextButton onClick={() => setStep((2))}>Nästa</NextButton>
          </EnergyWrapper>
        )}

        {step === 2 && (
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
              <NextButton onClick={() => setStep(3)}>Se min dag</NextButton>
            </ShowButtonWrapper>
          </>
        )}

        {step === 3 && (
          <BalanceWrapper>
            <h2>Så här ser din dag ut</h2>
            <BatteryWrapper>
              <Battery energy={energyLeft} size="large" />
            </BatteryWrapper>

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

            <StatsGrid>
              <StatCard>
                <StatIcon><Calendar size={32} /></StatIcon>
                <StatValue>{selectedActivities.length}</StatValue>
                <StatLabel>aktiviteter</StatLabel>
              </StatCard>

              <StatCard>
                <StatIcon><Lightning size={32} /></StatIcon>
                <StatValue>{energyLevel}</StatValue>
                <StatLabel>startenergi</StatLabel>
              </StatCard>

              <StatCard>
                <StatIcon><Flag size={32} /></StatIcon>
                <StatValue>{energyLeft}</StatValue>
                <StatLabel>förväntad slutenergi</StatLabel>
              </StatCard>

              <StatCard>
                <StatIcon><Sparkle size={32} /></StatIcon>
                <StatValue>{recovery}</StatValue>
                <StatLabel>återhämtning</StatLabel>
              </StatCard>
            </StatsGrid>

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

            <ShowButtonWrapper>
              <SecondaryButton onClick={() => setStep(2)}> ← Ändra plan</SecondaryButton>
              <NextButton onClick={() => { /* TODO: spara */ }}>Spara min dag 🎉</NextButton>
            </ShowButtonWrapper>
          </BalanceWrapper>
        )}
      </PageWrapper >
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const PageWrapper = styled.div`
      max-width: 500px;
      margin: 0 auto;
      padding: 16px;
      `;

const EnergyWrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      background: var(--color-card);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 24px;
      `;

const EnergyButtonWrapper = styled.div`
      display: flex;
      justify-content: center;
      gap: 8px;
      `;

const EnergyButton = styled.button`
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid var(--color-border);
      background: ${(props) => (props.$active ? "var(--color-primary)" : "white")};
      color: ${(props) => (props.$active ? "white" : "var(--color-text)")};
      cursor: pointer;
      font-weight: bold;
      font-size: 12px;

      @media (min-width: 400px) {
        width: 36px;
      height: 36px;
      font-size: 13px;
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
      `;

const BatteryWrapper = styled.div`
      display: flex;
      justify-content: center;
      margin: 20px 0;

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
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 12px;
      text-align: center;
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

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    text-align: center;
    margin: 0;
    }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const StatCard = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  font-size: 26px;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: var(--color-text);
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: var(--color-text-muted);
  text-transform: lowercase;
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

