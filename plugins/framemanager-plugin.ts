import {
    FrameManager, FrameManagerPool
} from './framemanager';

import { Plugins as PhaserPlugins } from 'phaser';
class FrameManagerPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, key?: any, width?: any, height?: any, cellWidth?: any, cellHeight?: any, fillColor?: any, useDynamicTexture?: any) {
        return new FrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
    }

    addPool(scene?: any, key?: any, width?: any, height?: any, cellWidth?: any, cellHeight?: any, fillColor?: any, useDynamicTexture?: any) {
        return new FrameManagerPool(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
    }

}

export default FrameManagerPlugin;