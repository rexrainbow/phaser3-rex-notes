import Methods from './canvasdata.js';

import { Display as PhaserDisplay, Plugins as PhaserPlugins } from 'phaser';
const CanvasPool = PhaserDisplay.Canvas.CanvasPool;

class CanvasDataPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this._tmpCanvas = CanvasPool.create2D(this);
    }

    destroy() {
        CanvasPool.remove(this._tmpCanvas);
        this._tmpCanvas = undefined;
        super.destroy();
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