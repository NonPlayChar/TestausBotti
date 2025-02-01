const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { maria } = require('../../../config.json');
const { getConnection } = require('../../mariadb.js');
const mariadb = require("mariadb")
const { EmbedBuilder } = require('discord.js');
const { name } = require('../../events/ready.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('Returns data from the database.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('leaderboard')
				.setDescription('Returns the leaderboard for a specified date.')
				.addStringOption(option =>
					option
						.setName('timeframe')
						.setDescription('The timeframe for the data.')
						.setRequired(true)
						.addChoices(
							{ name: 'Alltime', value: 'alltime' },
							{ name: 'Yesterday', value: 'yesterday' },
						)))


	,async execute(interaction) {
		try{
		const subcommand = interaction.options.getSubcommand();
		const connection = getConnection();
		await interaction.reply(`Fetching data for ${subcommand}...`);
		const file = new AttachmentBuilder('maomao.png', { name: 'maomao.png' });
		if (subcommand === 'leaderboard')  {
			if (interaction.options.getString('timeframe') === 'alltime') {
				const data = await connection.query("SELECT userid, SUM(message_count) AS total_messages FROM messages_day_stat GROUP BY userid ORDER BY total_messages DESC LIMIT 5");
				// console.log(data);
				const embed = new EmbedBuilder()
					.setTitle('Serverin aktiivisimmat jäsenet')
					.setColor('#445282')
					.addFields(
						{ name: 'Sijalla 1.', value: `${data[0].userid}, ${data[0].total_messages} viestiä` },
						{ name: 'Sijalla 2.', value: `${data[1].userid}, ${data[1].total_messages} viestiä` },
						{ name: 'Sijalla 3.', value: `${data[2].userid}, ${data[2].total_messages} viestiä` },
						{ name: 'Sijalla 4.', value: `${data[3].userid}, ${data[3].total_messages} viestiä` },
						{ name: 'Sijalla 5.', value: `${data[4].userid}, ${data[4].total_messages} viestiä` },
					)
					.setTimestamp()
					.setFooter({ text: 'Testausbotti', iconURL: 'attachment://maomao.png' });
				await interaction.editReply({ embeds: [embed], files: [file] });}
			
			else if (interaction.options.getString('timeframe') === 'yesterday') {
				await interaction.editReply('Eilistä ei ole vielä tallennettu.')}
		
			}}
		catch (error) {
			console.warn(error);
		}}};