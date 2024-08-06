# AliciaBot
Оболочка бота для твоего сервера.

## Требования
- Node - v20.15.0 или выше.
- Npm - v10.7.0 или выше.
> [!NOTE]
> Мы рекомендуем использовать Node Version Manager (NVM) для установки и управления версиями Node и Npm.

## Установка
установка с помощью git:
```
git clone https://github.com/NiRBES02/AliciaBot.git . && npm i
```
> [!CAUTION]
> Установка с помощью wget и curl еще не готова.

## Настройка и запуск
Первым делом настройте конфигурацию бота:
- **./configs/main.json**
- **./configs/bot.json**

После настройки конфигурации запустите бота:
```
# node . or node index.js
node .
```
Поздравляю, Вы запустили оболочку своего бота.

## Модули
В корневой папке имеется папка `/modules` в которой  находятся файлы обработчики Discord событий на основе которых Вы строите свой модуль.
Всего на данный момент имеются два обработчика событий. Так же есть системный `/system` и пользовательский `/costum ` каталоги.
Первый предназначен для модулей поставляемые с ботом, а второй для Ваших модулей.
### Создание модуля
Перейдите в пользовательский каталог и создайте там папку `/MyModule`.
Внутри этого каталога создайте файл `index.js`:
```javascript
const {
    Core
} = require('ds-core');
module.exports = {
    enable: true,
    type: 'ClientReady',
    async execute(client) {
        Core.log('Бот авторизовался!', 'success');
    },
}
```
При запуске бота, сработает событие Discord ClientReady который запустит Ваш модуль.

## Связь
- Discord Server: [Dev@Sakura](https://discord.com/invite/3QKtvHkSMK)
- Discord Author: dev_nirbes
