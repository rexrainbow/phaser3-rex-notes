import LifeTime from './lifetime.js';

import { Plugins as PhaserPlugins } from 'phaser';
class LifeTimePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new LifeTime(gameObject, config);
    }

}

export default LifeTimePlugin;