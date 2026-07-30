import ClickOutside from './clickoutside.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ClickOutsidePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new ClickOutside(gameObject, config);
    }

}

export default ClickOutsidePlugin;