import { Schema, model } from "mongoose";

const activitySchema = new Schema({
  name: {
    String,
    required: true,
  },
  energyImpact: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})

export const Activity = model("activity", activitySchema);