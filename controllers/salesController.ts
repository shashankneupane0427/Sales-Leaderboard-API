import { Request, Response } from "express";
import pool from "../db.js";
import { SaleInput, SaleOutput } from "../types/sales.js";

// Create a new sale
export const createSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const { agentName, amountSold, numberOfSales } = req.body as SaleInput;

    if (!agentName || amountSold == null || numberOfSales == null) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const query = `
      INSERT INTO sale (agent_name, amount_sold, number_of_sales, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, agent_name AS "agentName", amount_sold AS "amountSold", number_of_sales AS "numberOfSales", created_at AS "createdAt"
    `;

    const values = [agentName, amountSold, numberOfSales];

    const { rows } = await pool.query(query, values);
    const sale: SaleOutput = rows[0];

    res.status(201).json({ message: "Sales recorded successfully", sale });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to create sale" });
  }
};

// Get all sales
export const getSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = `
      SELECT id,
             agent_name AS "agentName",
             amount_sold AS "amountSold",
             number_of_sales AS "numberOfSales",
             created_at AS "createdAt"
      FROM sale
      ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query);
    const sales: SaleOutput[] = rows;

    res.status(200).json(sales);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to fetch sales" });
  }
};
