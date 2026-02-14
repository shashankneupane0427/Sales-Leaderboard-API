import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import salesRoutes from "./routes/salesRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();
import pool from "./db.js";

const app: Application = express();
pool;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response): void => {
  res.send(`
    <h1>Welcome to the Sales Leaderboard API!</h1>
    <h2>Available Endpoints:</h2>
    <ul>
      <li><strong>POST /api/sales</strong> - Add a new sale. Body: { "agentName": "John", "amountSold": 12000, "numberOfSales": 100 }</li>
      <li><strong>GET /api/sales</strong> - Get all sales</li>
      <li><strong>GET /api/leaderboard</strong> - Get sales leaderboard sorted by amount</li>
    </ul>
  `);
});

// Routes
app.use("/api/sales", salesRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Start server
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
