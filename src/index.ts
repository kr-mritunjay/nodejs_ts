import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.KEY,
});

client
  .connect()
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error("Connection error", err.stack));

// export default client;

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

// other way of using insertion in sql

async function insertUsertable() {
  // await client.connect(); // Ensure connection to the database

  try {
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ('ankit', 'ankitkr160@gmail.com', '1234')`;
    const res = await client.query(insertQuery);
    console.log("Insertion successful");
  } catch (err) {
    console.log("Error during insertion:", err); // Log the actual error message
  } finally {
    await client.end(); // Close the connection after query execution
  }
}

insertUsertable();
