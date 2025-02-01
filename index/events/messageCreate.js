const { Events } = require('discord.js');



module.exports = {
    name: Events.MessageCreate,
    execute(message) {

        if (message.author.bot) return;
        try{
            console.log(`Message : ${message.content} \nAuthor : ${message.author.id} \nGuild : ${message.guildId} \nChannel : ${message.channelId}`);
    }
        catch (error) {
            console.error(error);
        }},
};