import { Schema, model } from "mongoose";

const dailyPlanSchema = new Schema({
  // One unique id-person that points to the User model. The owner of the dailyplan.
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  startingEnergy: {
    type: Number,
  },

  activities: [{
    type: Schema.Types.ObjectId,
    ref: "activity",
  }],
  currentEnergy: {
    type: Number,
  }
})

export const dailyPlan = model("dailyPlan", dailyPlanSchema); 