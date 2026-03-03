import express from "express";
import { dailyPlan } from "../models/DailyPlan.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

export const router = express.Router();

// Endpoint to create new plan
router.post("/dailyplan", authenticateUser, async (req, res) => {
  try {
    const { date, startingEnergy, activities, currentEnergy } = req.body;
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const existing = await dailyPlan.findOne({
      user: req.user._id,
      date: { $gte: start, $lte: end }
    });

    if (existing) {
      return res.status(409).json({ error: "Du har redan sparat en plan idag, du kan gå tillbaka och ändra din nuvarande plan" });
    }

    const newPlan = new dailyPlan({ user: req.user._id, date, startingEnergy, activities, currentEnergy });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: "Could not create dailyplan" });
  }
});

// GET dailyplan - for history
router.get("/dailyplan", authenticateUser, async (req, res) => {
  try {
    const plan = await dailyPlan.find({ user: req.user._id }).populate("activities");

    res.json(plan);
  } catch (error) {
    res.status(400).json({ error: "Could not fetch dailyplan" });
  }
});


// Updates a dailyplan
router.patch("/dailyplan/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedPlan = await dailyPlan.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPlan) {
      return res.status(404).json({ error: "Could not find dailyplan" });
    }
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ error: "Could not update your plan" });
  }
});

//Deletes a dailyplan 
router.delete("/dailyplan/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDailyPlan = await dailyPlan.findByIdAndDelete(id);

    if (!deletedDailyPlan) {
      return res.status(404).json({ error: `Dailyplan with id ${id} does not exist` });
    }
    res.json(deletedDailyPlan);
  } catch (error) {
    res.status(500).json({ error: "Could not delete dailyplan" });
  }
});