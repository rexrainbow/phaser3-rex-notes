import GridCutImage from './gridcutimage';

import { Plugins as PhaserPlugins } from 'phaser';
class GridCutImagePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    gridCut(gameObject, columns, rows, config) {
        return GridCutImage(gameObject, columns, rows, config);
    }
}

export default GridCutImagePlugin;