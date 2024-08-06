const {
    Core
} = require('ds-core');
const chalk = require('chalk');
module.exports = {
    type: 'ClientReady',
    execute(Client) {
        Core.log('Бот авторизован', 'success');
    }
}