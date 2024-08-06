'use strict';

const {
    Core
} = require('ds-core');
const fs = require('fs');

class Init {
    constructor(arg) {
        const dir = arg.dirs;
        this.dirs = {
            main: dir,
            dev: `${dir}/dev`,
            configs: `${dir}/configs`,
            modules: `${dir}/modules`,
            libs: `${dir}/libs`
        }
        const configs = this.dirs.configs;
        this.configs = {
            main: Core.config({
                dir: this.dirs,
                file: 'config'
            })
        }
        this.client = require('./util/Client')

        Core.setCache(this)
    }
}

module.exports.Init = Init;