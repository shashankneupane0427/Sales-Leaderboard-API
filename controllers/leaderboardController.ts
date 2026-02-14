import { Request, Response } from "express";
import pool from "../db.js";
import { LeaderboardItem } from "../types/leaderboard.js";

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = `
      SELECT agent_name,
             SUM(amount_sold) AS total_amount,
             SUM(number_of_sales) AS total_deals
      FROM sale
      GROUP BY agent_name
      ORDER BY total_amount DESC
    `;
    const { rows } = await pool.query(query);

    let rank = 1;
    let previousTotal: number | null = null;

    const rankedLeaderboard: LeaderboardItem[] = rows.map((agent: any) => {
      let agentRank: number;

      if (previousTotal !== null && Number(agent.total_amount) === previousTotal) {
        agentRank = rank - 1; // same rank as previous
      } else {
        agentRank = rank;
      }

      previousTotal = Number(agent.total_amount);
      rank++;

      return {
        rank: agentRank,
        agentName: agent.agent_name,
        totalAmount: Number(agent.total_amount),
        totalDeals: Number(agent.total_deals),
      };
    });

    res.status(200).json(rankedLeaderboard);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to fetch leaderboard" });
  }
};
