import { Activity } from "../models/Activity.js";

export const defaults = [
  // Energizing 
  {
    name: "Promenad",
    energyImpact: 2,
    category: "rörelse"
  },
  {
    name: "Yoga",
    energyImpact: 3,
    category: "rörelse"
  },
  {
    name: "Träning",
    energyImpact: 2,
    category: "rörelse"
  },
  {
    name: "Meditation",
    energyImpact: 3,
    category: "vila"
  },
  {
    name: "Powernap",
    energyImpact: 3,
    category: "vila",
  },
  {
    name: "Umgås",
    energyImpact: 2,
    category: "socialt"
  },

  // Energy demanding
  {
    name: "Jobb",
    energyImpact: -2,
    category: "jobb"
  },
  {
    name: "Möte",
    energyImpact: -2,
    category: "jobb"
  },
  {
    name: "Städning",
    energyImpact: -2,
    category: "vardag"
  },
  {
    name: "Skärmtid",
    energyImpact: -1,
    category: "vardag"
  },
  {
    name: "Matlagning",
    energyImpact: -1,
    category: "vardag"
  },
  {
    name: "Pendling",
    energyImpact: -2,
    category: "vardag"
  }
];

export const seedActivities = async () => {
  const count = await Activity.countDocuments();
  if (count === 0) {
    await Activity.insertMany(defaults)
    console.log("Activities seeded!")
  }
}
