const { Events, MessageFlags } = require('discord.js');
const date = new Date();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
            console.log(`Time : ${date.getTime()} \nCommand : ${interaction.commandName} \nExecuted by : ${interaction.user.id} \nGuild : ${interaction.guildId} \nChannel : ${interaction.channelId}`);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};