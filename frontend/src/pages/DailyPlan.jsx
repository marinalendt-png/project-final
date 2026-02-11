import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { fetchActivities } from "../api/api";

export const DailyPlan = () => {
  const [activities, setActivities] = useState([]); //alla aktiviteter som finns i listan
  const [selectedActivities, setSelectedActivities] = useState([]); // de aktiviteter som användaren väljer. 

  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };

    loadActivities();
  }, []);

  const toggleActivity = (activityId) => {
    setSelectedActivities((prev) => prev.includes(activityId)
      ? prev.filter((id) => id !== activityId)
      : [...prev, activityId]
    );
  };

  const totalEnergy = activities
    .filter((activity) => selectedActivities.includes(activity._id)) //plockar ut aktiviteter med ett specifikt id (de som blivit klickade på)
    .reduce((sum, activity) => sum + activity.energyImpact, 0); //loopar igenom de valda aktiviteterna och lägger ihop alla energyimpactvärdena. sum börjar på 0 och växer för varje aktivitet. 

  return (
    <>
      <Navbar />
      <h1>Dagens plan</h1>
      {<p>Energi: {totalEnergy}</p>}
      {activities.map((activity) => (
        <p
          key={activity._id}
          onClick={() => toggleActivity(activity._id)}
          style={{
            cursor: "pointer",
            fontWeight: selectedActivities.includes(activity._id) ? "bold" : "normal",
          }}
        >
          {activity.name} ({activity.energyImpact > 0 ? "+" : ""}{activity.energyImpact})
        </p>
      ))}
    </>
  );
};
