const {
    Core
} = require('ds-core');
const {
    EmbedBuilder
} = require('discord.js');
const cfg = require('./config.json');


module.exports = {
    type: 'MessageCreate',
    execute(message) {
        if (message.channelId == cfg.channelId) {
            message.delete()
            message.channel.send({
                content: '|| <@&1265026095200079964> ||',
                embeds: [
                    new EmbedBuilder()
                    .setColor(0x00ff00)
                    .setAuthor({
                        name: `Dev@Sakura - AliciaBot V1.1.0`,
                        iconURL: message.guild.iconURL()
                    })
                    .setTitle('📰 Новость')
                    .setDescription(message.content)
                ]
            }).then(post => {
                post.startThread({
                    name: 'Обсуждение'
                }).then(thread => {
                    thread.send({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(0x00ff00)
                            .setTitle('💬 Обсуждение')
                            .setDescription('Обсудите новость вместе с нами!')
                        ]
                    })
                })
            })
        }
    }
}