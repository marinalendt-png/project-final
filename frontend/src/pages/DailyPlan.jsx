import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { fetchActivities } from "../api/api";
import styled from "styled-components";
import { ActivityCard } from "../components/ActivityCard";

export const DailyPlan = () => {
  const [activities, setActivities] = useState([]); //alla aktiviteter som finns i listan
  const [selectedActivities, setSelectedActivities] = useState([]); // de aktiviteter som användaren väljer. 
  const [energyLevel, setEnergyLevel] = useState(null); // för att kunna välja startenergi-nivå
  const [showForm, setShowForm] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [step, setStep] = useState(1);

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

  // TOTAL AMOUNT OF ENERGY PER DAY 
  const totalEnergy = activities
    .filter((activity) => selectedActivities.includes(activity._id)) //plockar ut aktiviteter med ett specifikt id (de som blivit klickade på)
    .reduce((sum, activity) => sum + activity.energyImpact, 0); //loopar igenom de valda aktiviteterna och lägger ihop alla energyimpactvärdena. sum börjar på 0 och växer för varje aktivitet. 

  // ENERGY LEFT PER DAY (startenergy - the chosen activities that takes energy)
  const energyLeft = energyLevel
    ? energyLevel + activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact < 0)
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
            {energyLevel && (
              <NextButton onClick={() => setStep((2))}>Nästa</NextButton>
            )}
          </EnergyWrapper>
        )}
        {step === 2 && (
          <>
            <h2 style={{ textAlign: "center", color: "white" }}>Planera din dag</h2>
            <InfoCardRow>
              <InfoCard>
                <span>Energi kvar</span>
                <strong>{energyLeft} / 10</strong>
              </InfoCard>
              <InfoCard>
                <span>Återhämtning</span>
                <strong>{recovery} / 10</strong>
              </InfoCard>
            </InfoCardRow>

            <ActivitiesRow>
              <ActivitiesColumn>
                <h3>Tar energi</h3>
                {activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact < 0).length === 0 ? (
                  <EmptyState>Tryck på "Lägg till aktivitet" för att lägga till</EmptyState>
                ) : (
                  activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact < 0).map((activity) => (
                    <ActivityCard
                      key={activity._id}
                      activity={activity}>
                    </ActivityCard>
                  ))
                )}
              </ActivitiesColumn>

              <ActivitiesColumn>
                <h3>Ger energi</h3>
                {activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact > 0).length === 0 ? (
                  <EmptyState>Tryck på "Lägg till aktivitet" för att lägga till</EmptyState>
                ) : (
                  activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact > 0).map((activity) => (
                    <ActivityCard
                      key={activity._id}
                      activity={activity}>
                    </ActivityCard>
                  ))
                )}
              </ActivitiesColumn>
            </ActivitiesRow>

            <ShowButtonWrapper>
              <AddButton onClick={() => setShowPicker(!showPicker)}>
                Lägg till aktivitet
              </AddButton>
              {showPicker && (
                <PickerList>
                  <ActivitiesRow>
                    <ActivitiesColumn>
                      <h4>Tar energi</h4>
                      {activities
                        .filter((a) => !selectedActivities.includes(a._id) && a.energyImpact < 0)
                        .map((activity) => (
                          <ActivityCard
                            key={activity._id}
                            activity={activity}
                            onClick={() => {
                              toggleActivity(activity._id);
                              setShowPicker(false);
                            }}
                          >
                          </ActivityCard>
                        ))}
                    </ActivitiesColumn>
                    <ActivitiesColumn>
                      <h4>Ger energi</h4>
                      {activities
                        .filter((a) => !selectedActivities.includes(a._id) && a.energyImpact > 0)
                        .map((activity) => (
                          <ActivityCard
                            key={activity._id}
                            activity={activity}
                            onClick={() => {
                              toggleActivity(activity._id);
                              setShowPicker(false);
                            }}
                          >
                          </ActivityCard>
                        ))}
                    </ActivitiesColumn>
                  </ActivitiesRow>
                  <AddButton onClick={() => { setShowForm(true); setShowPicker(false); }}>
                    Skapa ny aktivitet
                  </AddButton>
                </PickerList>
              )}

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
            <ShowButtonWrapper>
              <NextButton onClick={() => setStep(3)}>Se min dag</NextButton>
            </ShowButtonWrapper>
          </>
        )}
        {step === 3 && (
          <>
            <h2 style={{ textAlign: "center", color: "white" }}>Din dag</h2>
            <InfoCardRow>
              <InfoCard>
                <span>Startenergi</span>
                <strong>{energyLevel} / 10</strong>
              </InfoCard>
              <InfoCard>
                <span>Energi kvar</span>
                <strong>{energyLeft} / 10</strong>
              </InfoCard>
              <InfoCard>
                <span>Återhämtning</span>
                <strong>{recovery} / 10</strong>
              </InfoCard>
            </InfoCardRow>

            <ActivitiesRow>
              <ActivitiesColumn>
                <h3>Tar energi</h3>
                {activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact < 0).map((activity) => (
                  <ActivityCard key={activity._id}
                    activity={activity}>
                  </ActivityCard>
                ))}
              </ActivitiesColumn>
              <ActivitiesColumn>
                <h3>Ger energi</h3>
                {activities.filter((a) => selectedActivities.includes(a._id) && a.energyImpact > 0).map((activity) => (
                  <ActivityCard key={activity._id}
                    activity={activity}>
                  </ActivityCard>
                ))}
              </ActivitiesColumn>
            </ActivitiesRow>

            <ShowButtonWrapper>
              <NextButton onClick={() => setStep(2)}>Ändra plan</NextButton>
            </ShowButtonWrapper>
          </>
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
      padding-top: 10vh;
      `;

const EnergyWrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      h2, h3 {
        color: white;
  }
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

const InfoCardRow = styled.div`
      display: flex;
      gap: 16px;
      justify-content: center;
      margin: 20px 0;
      `;

const InfoCard = styled.div`
      flex:1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      min-height: 80px;
      border-radius: 12px;
      background: var(--color-card);
      border: 1px solid var(--color-border);
      `;

const ActivitiesRow = styled.div`
      display: flex;
      gap: 30px;
      `;

const ActivitiesColumn = styled.div`
      flex: 1;

      h3, h4 {
        color: white;
      }
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

const PickerList = styled.div`
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      `;

const PickerItem = styled.div`
      display: flex;
      justify-content: space-between;
      padding: 12px;
      border-radius: 8px;
      background: var(--color-card);
      border: 1px solid var(--color-border);
      cursor: pointer;
      `;

const EmptyState = styled.p`
      font-size: 14px;
      color: var(--color-text-muted);
      text-align: center;
      padding: 20px 8px;
      border: 1px dashed var(--color-border);
      border-radius: 8px;
      `;