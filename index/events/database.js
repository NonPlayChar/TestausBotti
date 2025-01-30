const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('messages.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to database.');
  }
});


function saveMessage(authorId, guildId, channelId) {
  const timestamp = new Date(); // Current timestamp
  db.run(
    `INSERT INTO messages (author_id, guild_id, channel_id, timestamp) VALUES (?, ?, ?, ?)`,
    [authorId, guildId, channelId, timestamp],
    function (err) {
      if (err) {
        console.error('Error inserting message:', err.message);
      } else {
        console.log(`Message saved. ID: ${this.lastID}`);
      }
    }
  );
}

module.exports = { db, saveMessage };