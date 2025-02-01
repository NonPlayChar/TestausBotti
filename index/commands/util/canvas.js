const Canvas = require('@napi-rs/canvas');
const { SlashCommandBuilder, AttachmentBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('canvas')
        .setDescription('Draws a canvas.'),
    
    async execute(interaction) {
        interaction.reply('Drawing canvas...');
}}