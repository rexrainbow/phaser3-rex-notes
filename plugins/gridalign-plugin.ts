import {
    HexagonGridAlign,
    QuadGridAlign
} from './gridalign';

import { Plugins as PhaserPlugins } from 'phaser';
class GridAlignPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    hexagon(items?: any, options?: any) {
        return HexagonGridAlign(items, options);
    }

    quad(items?: any, options?: any) {
        return QuadGridAlign(items, options);
    }
}

export default GridAlignPlugin;