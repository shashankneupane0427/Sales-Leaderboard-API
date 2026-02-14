import pool from './db';

const initializeSchema = async (): Promise<void> => {
  const client = await pool.connect();
  
  try {
    console.log("Initializing database schema...");

    await client.query(`
      DROP TABLE IF EXISTS sale CASCADE;

      CREATE TABLE sale (
        id SERIAL PRIMARY KEY,
        agent_name VARCHAR(255) NOT NULL,
        amount_sold DECIMAL(12, 2) NOT NULL,
        number_of_sales INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Table 'sale' created successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

initializeSchema();