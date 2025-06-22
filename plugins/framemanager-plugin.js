import {
    FrameManager, FrameManagerPool
} from './framemanager.js';

class FrameManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
        return new FrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
    }

    addPool(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
        return new FrameManagerPool(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
    }

}

export default FrameManagerPlugin;