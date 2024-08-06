'use strict';

const {
    TimeDate
} = require('./util/TimeDate');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const NodeCache = require('node-cache');
const node_cache = new NodeCache();

class Core {
    constructor() {}

    static async log(string, color) {
        let TD = new TimeDate(Date.now());
        switch (color) {
            case 'success':
                string = chalk.green(string);
                break;
            case 'warning':
                string = chalk.yellow(string);
                break;
            case 'danger':
                string = chalk.redBright(string);
                break;
            case 'primary':
                string = chalk.blueBright(string);
                break;
            case 'secondary':
                string = chalk.gray(string);
                break;
            case 'info':
                string = chalk.cyan(string);
                break;
            default: string;
                break;
        }
        console.log(`[${TD.getHours()}:${TD.getMinutes()}:${TD.getSeconds()}] ${string}`);
    }
    static config(arg) {
        if (fs.existsSync(arg.dir.dev)) {
            return require(`${arg.dir.dev}/${arg.file}.json`);
        } else {
            return require(`${arg.dir.configs}/${arg.file}.json`);
        }
    }
    static setCache(arg) {
        node_cache.set('cache', arg);
    }
    static getCache() {
        if (node_cache.has('cache')) {
            return node_cache.get('cache');
        } else {
            return null;
        }
    }

    static loadModules(arg) {
        Core.log('Загрузка обработчиков событий');
        const pathM = path.join(Core.getCache().dirs.modules);
        const fileM = fs.readdirSync(pathM).filter(file => file.endsWith('.js'));
        let count = 0;
        for (const file of fileM) {
            const module = require(path.join(pathM, file));
            if (module.once) {
                arg.client.once(module.name, (...args) => module.execute(...args));
                Core.log(`${chalk.gray('{S}')} ${chalk.green(file)} загружен`);
            } else {
                arg.client.on(module.name, (...args) => module.execute(...args));
                Core.log(`${chalk.gray('{D}')} ${chalk.green(file)} загружен`);
            }
            count++
        }
        Core.log(`Загружено обработчиков событий: ${chalk.green(count)}`);
    }
    static loadModule(arg, opt) {
        const dirM = Core.getCache().dirs.modules;
        const pathM = fs.readdirSync(`${dirM}/${opt.mode}`, {
            withFileTypes: true
        }).filter(folder => folder.isDirectory()).map(folder => folder.name);
        for (const folderM of pathM) {
            const dirsM = path.join(`${dirM}/${opt.mode}`, folderM);
            const filesM = fs.readdirSync(dirsM).filter(file => file.endsWith('.js'));
            for (const file of filesM) {
                const module = require(`${dirsM}/${file}`);
                if (module.type == opt.type) {
                    module.execute(arg)
                }
            }
        }
    }
    static placeholder(str, obj) {
        const replace = str.replace(/{(.*?)}/g, (match, key) => obj[key] || match);
        return replace.toString();
    }
    static chance(options) {
        return new Promise((resolve, reject) => {
            options = options.sort((a, b) => a.percent - b.percent);
            let random = Math.floor(Math.random() * 100);
            for (const option of options) {
                if (random <= option.percent) {
                    resolve(option);
                }
                random -= option.percent;
            }
            resolve(options[options.length - 1])
        });
    }
}

module.exports.Core = Core;