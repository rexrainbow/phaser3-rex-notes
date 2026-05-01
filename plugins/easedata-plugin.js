import { EaseData } from './easedata.js';

import { Plugins as PhaserPlugins } from 'phaser';
class EaseDataPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new EaseData(gameObject, config);
    }
}

export default EaseDataPlugin;