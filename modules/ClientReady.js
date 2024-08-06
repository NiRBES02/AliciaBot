const {
    Core
} = require('ds-core');
const {
    Events
} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        Core.loadModule(client, {
            type: 'ClientReady',
            mode: 'system'
        });
        Core.loadModule(client, {
            type: 'ClientReady',
            mode: 'custom'
        });
    }
}