const { Events } = require('discord.js');
const { saveMessage } = require('./database');



module.exports = {
    name: Events.MessageCreate,
    execute(message) {

        if (message.author.bot) return;
        try{
            console.log(`Message : ${message.content} \nAuthor : ${message.author.id} \nGuild : ${message.guildId} \nChannel : ${message.channelId}`);
            saveMessage(message.author.id, message.guildId, message.channelId);
    }
        catch (error) {
            console.error(error);
        }},
};