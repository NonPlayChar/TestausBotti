const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { db } = require('../../events/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('Returns data from the database.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('topchannel')
                .setDescription('Returns the most active channel in a given guild.')
                .addStringOption(option => option.setName('guildid').setDescription('The id of a guild.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('topuser')
                .setDescription('Returns the most active user in a given guild.')
                .addStringOption(option => option.setName('guildid').setDescription('The id of a guild.').setRequired(true))),
        
        

	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'topchannel') {
            const guildId = interaction.options.getString('guildid');

            await interaction.reply(`Getting data from guild...`);
        
            
            db.all(
                `SELECT channel_id, COUNT(channel_id) as count FROM messages WHERE guild_id = ? GROUP BY channel_id ORDER BY count DESC LIMIT 1`,
                [guildId],
                (err, rows) => {
                    if (err) {
                        console.error('Error getting data:', err.message);
                        return;
                    }
                    if (rows.length === 0) {
                        interaction.editReply('No data found.');
                    } else {
                        const { channel_id, count } = rows[0];
                        interaction.editReply({ content: `The most active channel is <#${channel_id}> with ${count} messages.`, flags: MessageFlags.Ephemeral });
                    }
                }
            );
        
        }
        if (interaction.options.getSubcommand() === 'topuser') {
            const guildId = interaction.options.getString('guildid');

            await interaction.reply(`Getting data from guild...`);
        
            
            db.all(
                `SELECT author_id, COUNT(author_id) as count FROM messages WHERE guild_id = ? GROUP BY author_id ORDER BY count DESC LIMIT 1`,
                [guildId],
                (err, rows) => {
                    if (err) {
                        console.error('Error getting data:', err.message);
                        return;
                    }
                    if (rows.length === 0) {
                        interaction.editReply('No data found.');
                    } else {
                        const { author_id, count } = rows[0];
                        interaction.editReply({ content: `The most active user is <@${author_id}> with ${count} messages.`, flags: MessageFlags.Ephemeral });
                    }
                }
            );
        
        }
	},
};


