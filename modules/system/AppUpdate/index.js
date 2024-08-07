const {
    Core
} = require('ds-core');
const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');
const chalk = require('chalk');
const WebSocket = require('ws');
const cache = Core.getCache();

let client;
function connect(Client) {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel('🔗 GitHub')
        .setURL('https://github.com/NiRBES02/AliciaBot')
        .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
        .setLabel('🔗 Discord')
        .setURL('https://discord.com/invite/3QKtvHkSMK')
        .setStyle(ButtonStyle.Link)
    );
    
    const guild = Client.guilds.cache.find(g => g.id == cache.configs.main.guildId);
    const params = new URLSearchParams({
        id: guild.id,
        name: guild.name
    }).toString();

    client = new WebSocket(`${cache.configs.main.ws.url}?${params}`);
    const interval = cache.configs.main.ws.interval * 1000;
    const timeout = cache.configs.main.ws.timeout * 1000;
    const timeoutId = setTimeout(() => {
        client.terminate();
    }, timeout);

    client.on('open', (server) => {
        clearTimeout(timeoutId);
        Core.log('Соединение с сервером установлено');
        Client.on('messageCreate', (message) => {
            if (message.author.bot) return;
            if (message.channel.id == '1257062756033757304') {
                client.send(JSON.stringify({
                    msg: message.content
                }));
            }
        });
    });
    client.on('message', (message) => {
        const obj = JSON.parse(message);
        const channel = guild.channels.fetch(guild.publicUpdatesChannelId).then(system => {
            system.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0x00ff00)
                    .setTitle('📰 Новость')
                    .setAuthor({
                        name: `Dev@Sakura - AliciaBot V${obj.value.lts}`,
                        iconURL: guild.iconURL()
                    })
                    .setDescription(`${obj.msg}`)
                ],
                components: [row]
            }).then(systemMessage => {
                Core.log(`Получено сообщение от сервера: ${chalk.green(systemMessage.channel.name)}`);
            });
        });
    });
    client.on('error', (error) => {
        Core.log(error.message,
            'secondary');
    });
    client.on('close', (close) => {
        Core.log('Соединение с сервером закрыто');
        Core.log(`Повторное подключение через ${interval / 1000} сек.`);
        setTimeout(() => {connect(Client)},
            interval);
    });

}


module.exports = {
    enable: false,
    type: 'ClientReady',
    execute(Client) {
        connect(Client);
    }
}