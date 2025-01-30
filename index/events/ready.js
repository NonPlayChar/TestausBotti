const { Events, ActivityType } = require('discord.js');
const { db } = require('./database');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		
		client.user.setPresence({
			activities: [{ name: `you sleep...`, type: ActivityType.Watching }],
			status: 'online',
		  });
		
		try{
			db.run(
				`CREATE TABLE IF NOT EXISTS messages (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
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
			
			

			console.log(`Ready! Logged in as ${client.user.tag}`);
	}
		catch (error) {
			console.error(error);
		}},
};