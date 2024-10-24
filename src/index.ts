import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  connectionString: process.env.KEY,
});

// async function createUsersTable() {
//   await client.connect();
//   const result = await client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(50) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);
//   console.log(result);
// }

// createUsersTable();
async function insertUsertable() {
  try {
    await client.connect();
    const query = `
      INSERT INTO users (id, username, email, password)
      VALUES 
        ($1, $2, $3, $4),
        ($5, $6, $7, $8),
        ($9, $10, $11, $12)
    `;

    const values = [
      2,
      "krmritunjay",
      "krmritunjaykr160@gmail.com",
      "12345", // First user
      3,
      "john",
      "john.doe@gmail.com",
      "password123", // Second user
      4,
      "jane",
      "jane.doe@gmail.com",
      "mypassword", // Third user
    ]; // Replace '12345' with hashed password
    const result = await client.query(query, values);
    console.log(result);
  } catch (err) {
    console.error("Error executing query", err);
  } finally {
    await client.end();
  }
}

insertUsertable();
