const {
    Core
} = require('ds-core');
module.exports = {
    enable: true,
    type: 'ClientReady',
    execute(Client) {
        Core.log('Бот авторизован', 'success');
    }
}