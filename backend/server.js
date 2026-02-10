import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as activitiesRouter } from "./routes/activitiesRoutes.js";
import { seedActivities } from "./data/seedActivities.js";


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl).then(() => {
  seedActivities();
});


const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);

  res.json([{
    message: "Welcome to the Balans API",
    endpoints: endpoints,
  }])
});

// Connecting the different routes with endpoints. 
app.use(userRouter);
app.use(activitiesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
