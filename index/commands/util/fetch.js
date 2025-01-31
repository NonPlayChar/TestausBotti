const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { maria } = require('../../config.json');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('Returns data from the database.')
        
        

	,async execute(interaction) {

    }};