const { createCanvas, Image } = require('@napi-rs/canvas');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { readFile } = require('fs/promises');
const sharp = require('sharp');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('canvas')
		.setDescription('Replies with an image!'),

	async execute(interaction) {
        const imageBuffer = await readFile('maomao.png');

        const { width, height } = await sharp(imageBuffer).metadata();

        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        // Load the background image properly
        
        const backgroundImage = new Image();

        // Wait until the image is loaded
        await new Promise((resolve) => {
            backgroundImage.onload = resolve;
            backgroundImage.src = imageBuffer;
        });

        // Draw the image after it's loaded
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Create an attachment and send it
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
        await interaction.reply({ files: [attachment] });
	},
};
