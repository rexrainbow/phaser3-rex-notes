import Gashapon from './gashapon.js';

import { Plugins as PhaserPlugins } from 'phaser';
class GashaponPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Gashapon(config);
    }
}

export default GashaponPlugin;