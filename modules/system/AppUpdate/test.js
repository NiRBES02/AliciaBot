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
let Client;

class WebSocketClient {
    constructor(data) {
        Client = data.Client;
        this.cfg = {
            ws: cache.configs.main.ws,
            main: cache.configs.main
        }
        this.guild = Client.guilds.cache.find(g => g.id == this.cfg.main.guildId);
        this.params = new URLSearchParams({
            id: this.guild.id,
            name: this.guild.name
        }).toString();

        this.timeout = this.cfg.ws.timeout * 1000;
        this.interval = this.cfg.ws.interval * 1000;
        this.timeoutId = setTimeout(() => {
            client.terminate();
        }, this.timeout);
    }

    #onOpen() {
        client.on('open', (server) => {
            clearTimeout(this.timeoutId);
            Core.log('Соединение с сервером установлено');
            Client.on('messageCreate', (message) => {
                if (message.author.bot) return;
                if (message.channel.id == '1257062756033757304') {
                    client.send(JSON.stringify({
                        msg: message.content
                    }));
                }
            });
        })
    }
    #onMessage() {
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
        client.on('message', (message) => {
            const obj = JSON.parse(message);
            this.guild.channels.fetch(this.guild.publicUpdatesChannelId).then(system => {
                system.send({
                    embeds: [
                        new EmbedBuilder()
                        .setColor(0x00ff00)
                        .setTitle('📰 Новость')
                        .setAuthor({
                            name: `Dev@Sakura - AliciaBot V${obj.value.lts}`,
                            iconURL: this.guild.iconURL()
                        })
                        .setDescription(`${obj.msg}`)
                    ],
                    components: [row]
                }).then(systemMessage => {
                    Core.log(`Получено сообщение от сервера: ${chalk.green(systemMessage.channel.name)}`);
                });
            });
        });
    }

    #onError() {
        client.on('error', (error) => {
            Core.log(error.message);
        });
    }
    #onClose() {
        client.on('close', (close) => {
            Core.log('Соединение с сервером закрыто');
            Core.log(`Повторное подключение через ${this.interval / 1000} сек.`);
            setTimeout(() => {
                this.connect();
            },
                this.interval);
        });
    }

    connect() {
        client = new WebSocket(`${this.cfg.ws.url}?${this.params}`);
        this.#onOpen();
        this.#onMessage();
        this.#onError();
        this.#onClose()
    }

}

module.exports = {
    enable: true,
    type: 'ClientReady',
    execute(Client) {
        const wsc = new WebSocketClient({
            Client: Client
        });
        wsc.connect();
    }
}