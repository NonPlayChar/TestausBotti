const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { db } = require('../../events/database');
const { EmbedBuilder } = require('discord.js');


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

            await interaction.reply({content: `Getting data from guild...`, flags: MessageFlags.Ephemeral });
        
            
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

            await interaction.reply({content: `Getting data from guild...`, flags: MessageFlags.Ephemeral });
            
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
                        console.log(author_id);
                        const exampleEmbed = new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setTitle('Most active user')
                            .setURL('https://discord.js.org/')
                            .setAuthor({ name: author_id, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                            .setDescription(`The most active user is <@${author_id}> with ${count} messages.`)
                            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                            .setImage('https://i.imgur.com/AfFp7pu.png')
                            .setTimestamp()
                            .setFooter({ text: 'NPC power!', iconURL: 'https://cdn.discordapp.com/attachments/1169020864650543114/1334952110080655441/Nayttokuva_2025-01-30_234100.png?ex=679e6689&is=679d1509&hm=e7b95c1fa8c5fe2e2c86638ecf9c1bfe81ce12c6ff51ee96f58b946a104b1d94&' });


                        
                        interaction.editReply({ embeds: [exampleEmbed] });
                    }
                }
            );
        
        }
	},
};


