import Bank from './bank.js';

import { Plugins as PhaserPlugins } from 'phaser';
class BankPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new Bank(config);
    }

}

export default BankPlugin;