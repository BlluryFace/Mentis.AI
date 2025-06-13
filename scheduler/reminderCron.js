const cron = require("node-cron");
const pool = require("../database/db");


const { sendReminderEmail } = require("../utils/email");


// Run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, "0");
  const currentMinute = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHour}:${currentMinute}`;
  const today = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  try {
    const reminders = await pool.query(
      `SELECT r.id, r.user_id, r.last_sent, u.email 
       FROM reminders r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.time = $1`,
      [currentTime]
    );

    for (const reminder of reminders.rows) {
      // Skip if already sent today
      if (reminder.last_sent === today) continue;

      await sendReminderEmail(
        reminder.email,
        "🧠 Hey, it's time to reflect: how are you feeling today?"
      );

      // Update last_sent
      await pool.query(
        "UPDATE reminders SET last_sent = $1 WHERE id = $2",
        [today, reminder.id]
      );

      console.log(`Reminder sent to ${reminder.email}`);
    }
  } catch (err) {
    console.error("Cron error:", err);
  }
});
