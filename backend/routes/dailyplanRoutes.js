import { Schema, model } from "mongoose";

const dailyPlanSchema = new Schema({
  date: {
    type: Date,
    default: () => new Date(),
  },
  startingEnergy: {
    type: Number,
  },
  activities: {
    type: String,
  },
  currentEnergy: {
    type: Number,
  }
})

export const dailyPlan = model("dailyPlan", dailyPlanSchema); 