import GridCutImage from './gridcutimage';

import { Plugins as PhaserPlugins } from 'phaser';
class GridCutImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    gridCut(gameObject?: any, columns?: any, rows?: any, config?: any) {
        return GridCutImage(gameObject, columns, rows, config);
    }
}

export default GridCutImagePlugin;