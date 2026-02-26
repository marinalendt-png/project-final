import { Navbar } from "../components/Navbar";
import { useState, useEffect, useCallback } from "react";
import { fetchActivities, createActivity, deleteActivities, createDailyPlan } from "../api/api";
import styled from "styled-components";
import { EnergyPicker } from "../components/EnergyPicker";
import { ActivityPlanner } from "../components/ActivityPlanner";
import { DaySummary } from "../components/DaySummary";
import { ArrowLeft } from "@phosphor-icons/react";

export const DailyPlan = () => {
  const [activities, setActivities] = useState([]); //alla aktiviteter som finns i listan
  const [selectedActivities, setSelectedActivities] = useState([]); // de aktiviteter som användaren väljer. 
  const [energyLevel, setEnergyLevel] = useState(null); // för att kunna välja startenergi-nivå
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [batteryPulse, setBatteryPulse] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // SHOWING ALL ACTIVITIES
  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };

    loadActivities();
  }, []);

  // TOGGLING ACTIVITIES + making the battery pulsate. 
  const toggleActivity = useCallback((activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
    setBatteryPulse(true);
    setTimeout(() => setBatteryPulse(false), 400);
  }, []);

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

  // SAVES dailyplan in database
  const handleSave = async () => {
    await createDailyPlan({
      date: new Date(),
      startingEnergy: energyLevel,
      activities: selectedActivities,
      currentEnergy: energyLeft,
    });
    setIsSaved(true);
  }

  // DELETE an activity
  const handleDelete = async (activityId) => {
    await deleteActivities(activityId);
    setActivities((prev) => prev.filter((a) => a._id !== activityId));
  };


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
      <BackRow>
        {step > 1 && (
          <BackButton onClick={() => setStep(step - 1)}>
            <ArrowLeft size={20} /> Tillbaka
          </BackButton>
        )}
      </BackRow>
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
            onDelete={handleDelete}
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
            onSave={handleSave}
            isSaved={isSaved}
          />
        )}
      </PageWrapper >
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const PageWrapper = styled.div`
  padding: 8px 16px 16px;
`;

const BackRow = styled.div`
  padding: 4px 16px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  font-size: 14px;
  padding: 4px 0;
  margin-bottom: 8px;

  &:hover {
    color: var(--color-primary);
  }
`;

