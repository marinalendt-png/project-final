import { Navbar } from "../components/Navbar";
import { useState, useEffect, useCallback } from "react";
import { fetchActivities, createActivity, deleteActivities, createDailyPlan } from "../api/api";
import styled from "styled-components";
import { EnergyPicker } from "../components/EnergyPicker";
import { ActivityPlanner } from "../components/ActivityPlanner";
import { DaySummary } from "../components/DaySummary";
import { ArrowLeft } from "@phosphor-icons/react";

export const DailyPlan = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [batteryPulse, setBatteryPulse] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // SHOWING ALL ACTIVITIES
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchActivities();
        setActivities(data);
      } catch (error) {
        console.error("Kunde inte ladda aktiviteter:", error);
      }
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
    try {
      const saved = await createActivity({ name, energyImpact, category });
      setActivities((prev) => [...prev, saved]);
      e.target.reset();
      setShowForm(false);
    } catch (error) {
      console.error("Kunde inte spara aktivitet:", error);
    }
  };

  // SAVES DAILYPLAN IN DATABASE
  const handleSave = async () => {
    try {
      setSaveError(null);
      await createDailyPlan({
        date: new Date(),
        startingEnergy: energyLevel,
        activities: selectedActivities,
        currentEnergy: energyLeft,
      });
      setIsSaved(true);
    } catch (error) {
      setSaveError(error.message);
    }
  };

  // DELETES AN ACTIVITY
  const handleDelete = async (activityId) => {
    try {
      await deleteActivities(activityId);
      setActivities((prev) => prev.filter((a) => a._id !== activityId));
    } catch (error) {
      console.error("Kunde inte ta bort aktivitet:", error)
    }
  };

  // ENERGY LEFT PER DAY (starting energy - the chosen activities that takes energy)
  const energyLeft = energyLevel
    ? energyLevel + activities
      .filter((a) => selectedActivities.includes(a._id))
      .reduce((sum, a) => sum + a.energyImpact, 0)
    : 0;

  return (
    <>
      <Navbar />
      <BackRow>
        {step > 1 && (
          <BackButton onClick={() => setStep(step - 1)}>
            <ArrowLeft size={20} aria-hidden="true" /> Tillbaka
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
            onBack={() => { setStep(2); setIsSaved(false); }}
            onSave={handleSave}
            isSaved={isSaved}
            saveError={saveError}
          />
        )}
      </PageWrapper>
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