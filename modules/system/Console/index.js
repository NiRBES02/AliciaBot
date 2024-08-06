const {
    Core
} = require('ds-core');
const chalk = require('chalk');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

function clearTerminal() {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    Core.log('Консоль очищена');
}

function getInput() {
    rl.question('', input => {
        switch (input) {
            case 'stop':
                Core.log('Бот выключен');
                process.exit();
                break;
            case 'test':
                Core.log('Тест');
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'cache':
                console.log(Core.getCache());
                break;
            default:
                Core.log('Неизвестная команда');
                break;
        }
        getInput();
    });
}

module.exports = {
    type: 'ClientReady',
    execute(Client) {
        getInput();
    }
}