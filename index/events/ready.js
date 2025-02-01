const { Events, ActivityType, AttachmentBuilder } = require('discord.js');
const { connect } = require('../mariadb.js');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		
		client.user.setPresence({
			activities: [{ name: `you sleep...`, type: ActivityType.Watching }],
			status: 'online',
		  });
		
		try{
			await connect();
			console.log(`Ready! Logged in as ${client.user.tag}`);
	}
		catch (error) {
			console.error(error);
		}},
};