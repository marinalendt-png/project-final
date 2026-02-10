import express from "express";
import { Activity } from "../models/Activity.js";

export const router = express.Router();

// Endpoints for all the activities
router.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find()
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch activities" })
  }
});

// Adding a new activity to the database
router.post("/activities", async (req, res) => {
  try {
    const { name, energyImpact, category } = req.body;
    if (!name || !energyImpact || !category) {
      return res.status(400).json({ error: "Name, energyImpact and category are required" });
    }

    const activity = new Activity({ name, energyImpact, category });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Could not create activity" })
  }
});

// Updates an activity
router.patch("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body
    const activity = await Activity.findByIdAndUpdate(id, updates, { new: true });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: "Could not update activity" });
  }
});

// Deletes an activity
router.delete("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id)

    if (!deletedActivity) {
      return res.status(404).json({ error: `Activity with id ${id} does not exist` })
    }
    res.json(deletedActivity)
  } catch (error) {
    res.status(500).json({ error: "Could not delete activity" })
  }
});