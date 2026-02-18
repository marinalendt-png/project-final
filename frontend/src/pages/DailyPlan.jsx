import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { fetchActivities, createActivity } from "../api/api";
import styled from "styled-components";
import { EnergyPicker } from "../components/EnergyPicker";
import { ActivityPlanner } from "../components/ActivityPlanner";
import { DaySummary } from "../components/DaySummary";

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

  // CREATE NEW ACTIVITY
  const handleAddActivity = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const energyImpact = Number(formData.get("energyImpact"));
    const category = formData.get("category");

    const saved = await createActivity({ name, energyImpact, category });

    setActivities((prev) => [...prev, saved]);
    e.target.reset();
    setShowForm(false);
  }

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
          <EnergyPicker
            energyLevel={energyLevel}
            setEnergyLevel={setEnergyLevel}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ActivityPlanner
            activities={activities}
            selectedActivities={selectedActivities}
            energyLeft={energyLeft}
            batteryPulse={batteryPulse}
            toggleActivity={toggleActivity}
            showForm={showForm}
            setShowForm={setShowForm}
            handleAddActivity={handleAddActivity}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <DaySummary
            activities={activities}
            selectedActivities={selectedActivities}
            energyLevel={energyLevel}
            energyLeft={energyLeft}
            recovery={recovery}
            onBack={() => setStep(2)}
            onSave={() => {/* TODO: SPARA */ }}
          />
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

      @media (min-width: 768px) {
        max-width: 700px;
        padding: 60px 16px;
      }
`;

