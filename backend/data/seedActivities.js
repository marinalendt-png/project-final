import { Activity } from "../models/Activity.js";

export const defaults = [
  // Activities that gives energy
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
    name: "Träning lätt",
    energyImpact: 1,
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
  {
    name: "Natur",
    energyImpact: 2,
    category: "vardag",
  },

  // Activities that takes energy. 
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
  },
  {
    name: "Handla",
    energyImpact: -2,
    category: "vardag"
  },
  {
    name: "Träning tung",
    energyImpact: -3,
    category: "rörelse",
  }
];

// Fills the database with standard activities once when the app starts. 
export const seedActivities = async () => {
  const count = await Activity.countDocuments();
  if (count === 0) {
    await Activity.insertMany(defaults);
  }
};
