import {
    HexagonGridAlign,
    QuadGridAlign
} from './gridalign.js';

class GridAlignPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    hexagon(items, config) {
        return HexagonGridAlign(items, config);
    }

    quad(items, config) {
        return QuadGridAlign(items, config);
    }
}

export default GridAlignPlugin;