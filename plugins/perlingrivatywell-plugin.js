import PerlinGrivatyWell from './perlingrivatywell.js';

import { Plugins as PhaserPlugins } from 'phaser';
class PerlinGrivatyWellPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new PerlinGrivatyWell(config);
    }

}

export default PerlinGrivatyWellPlugin;