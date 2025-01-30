const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('messages.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to database.');
  }
});

// Create the messages table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      author_id TEXT,
      guild_id TEXT,
      channel_id TEXT,
      timestamp TEXT
    )`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  }
);

// Function to insert a message into the database
function saveMessage(content, authorId, guildId, channelId) {
  const timestamp = new Date(); // Current timestamp
  db.run(
    `INSERT INTO messages (content, author_id, guild_id, channel_id, timestamp) VALUES (?, ?, ?, ?, ?)`,
    [content, authorId, guildId, channelId, timestamp],
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