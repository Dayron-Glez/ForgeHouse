import express from "express";
import cors from "cors";
import path from "path";
import { corsOptions } from "./config/cors";
import { errorHandler } from "./middleware/error-handler.middleware";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import exerciseRoutes from "./modules/exercise/exercise.routes";
import appointmentRoutes from "./modules/appointment/appointment.routes";
import bmiRoutes from "./modules/bmi/bmi.routes";

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/bmi", bmiRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "FitZone API running" });
});

// Error handler
app.use(errorHandler);

export default app;
