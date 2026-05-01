import CutJigsawImage from './cutjigsawimage';

import { Plugins as PhaserPlugins } from 'phaser';
class CutJigsawImagePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    gridCut(gameObject, config) {
        return CutJigsawImage(gameObject, config);
    }
}

export default CutJigsawImagePlugin;