import { Schema, model } from "mongoose";

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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