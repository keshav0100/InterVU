// import dotenv from "dotenv";
// dotenv.config(); // Ensure environment variables are loaded

// const DATABASE_URL = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

// if (!DATABASE_URL) {
//   throw new Error(
//     "Database connection string is not defined in the environment variables."
//   );
// }

// import postgres from "postgres"; // PostgreSQL client

// // Create a connection instance
// const sql = postgres(DATABASE_URL);

// (async () => {
//   try {
//     // Correct query syntax for 'postgres' package
//     const result = await sql`SELECT 1`;
//     console.log("Database connection successful:", result);
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// })();
