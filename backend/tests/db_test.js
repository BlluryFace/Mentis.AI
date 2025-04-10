import pool from "../services/db";
 (async () => {
     try {
         console.log("📝 Inserting test data...");

         // Insert into Users
         await pool.query("INSERT INTO users (name, email, password) " +
             "VALUES ('Test', 'test@example.com', '123');");
         console.log("✅ Test data inserted successfully.");
         await pool.query("DELETE FROM users WHERE name = 'Test'");
         console.log("✅ Test data deleted successfully.");
     } catch (err) {
         console.error("❌ Query error:", err);
     } finally {
         await pool.end(); // Close connection
     }
 })();