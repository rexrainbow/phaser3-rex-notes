import MouseWheelToUpDown from './mousewheeltoupdown.js';

import { Plugins as PhaserPlugins } from 'phaser';
class MouseWheelToUpDownPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new MouseWheelToUpDown(scene, config);
    }

}

export default MouseWheelToUpDownPlugin;