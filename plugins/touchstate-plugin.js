import TouchState from './touchstate.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TouchStatePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TouchState(gameObject, config);
    }

}

export default TouchStatePlugin;