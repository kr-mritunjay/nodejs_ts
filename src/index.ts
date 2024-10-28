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

async function createUsersTable() {
  // await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

createUsersTable();

// other way of using insertion in sql directly values are udated too db

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

// best way to do sql query to avoid sql injection here values are not directly updated

// coming to the get the values from users

async function getQuery() {
  try {
    const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    const res = await client.query(query, ["ankit", "1234"]);
    console.log(res.rows[0]);
  } catch (err) {
    console.log("Error while fetching", err);
  } finally {
    await client.end();
  }
}
getQuery();

// insertUsertable();
