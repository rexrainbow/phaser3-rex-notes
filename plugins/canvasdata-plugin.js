import Methods from './data/canvasdata/Methods.js';

class CanvasDataPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    get textureManager() {
        return this.game.textures;
    }
}

Object.assign(
    CanvasDataPlugin.prototype,
    Methods
);

export default CanvasDataPlugin;