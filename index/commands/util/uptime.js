const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('How long has the bot been online?'),
	async execute(interaction) {
        var min = Math.floor(interaction.client.uptime / 60000) % 60;
        var sec = Math.floor(interaction.client.uptime / 1000) % 60;
		await interaction.reply(`I have has been up for ${min} minutes and ${sec} seconds.`);
	},
};