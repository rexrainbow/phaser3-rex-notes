import CutJigsawImage from './cutjigsawimage';

import { Plugins as PhaserPlugins } from 'phaser';
class CutJigsawImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    gridCut(gameObject?: any, config?: any) {
        return CutJigsawImage(gameObject, config);
    }
}

export default CutJigsawImagePlugin;