const { Core } = require('ds-core');
const { Init } = require('ds-init');
const init = new Init({
    dirs: __dirname
});
Core.loadModules(init);

init.client.login(init.configs.main.token)