const pool = require("../config/postgreSQL_connection");
/** Add user's journal entry into database
 *
 * @param {string} user
 * @param {string} emotion
 * @param {string} date
 * @param {string} message
 * @returns {Promise<*>}
 */
async function add_journal(user, emotion, date, message){
    try {
        const query = 'insert into Journals (user, emotion, date, message)' +
                              'values ($1, $2, $3, $4) returning *';
        const result = await pool.query(query, [user, emotion, date, message])

        console.log("Journal added:", result);
        return result;
    } catch (err) {
        console.error("Error adding journal", err.stack);
        throw err;
    }
}

module.exports = {add_journal};