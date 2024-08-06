const {
    Core
} = require('ds-core');
const {
    Events
} = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot) return;
        
        Core.loadModule(message, {
            type: 'MessageCreate',
            mode: 'system'
        });
        Core.loadModule(message, {
            type: 'MessageCreate',
            mode: 'custom'
        });
    }
}