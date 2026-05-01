import {
    HexagonGridAlign,
    QuadGridAlign
} from './gridalign.js';

import { Plugins as PhaserPlugins } from 'phaser';
class GridAlignPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    hexagon(items, options) {
        return HexagonGridAlign(items, options);
    }

    quad(items, options) {
        return QuadGridAlign(items, options);
    }
}

export default GridAlignPlugin;