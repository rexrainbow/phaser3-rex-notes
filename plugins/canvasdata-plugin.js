import CanvasToData from './data/canvasdata/CanvasToData.js';
import BooleanBuffer from './data/canvasdata//buffers/BoolenaBuffer.js';

class CanvasDataPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    textObjectToBitmap(textObject, out) {
        return CanvasToData(
            textObject.canvas, // canvas
            BooleanBuffer,  // BufferClass
            undefined, // fillCallback
            undefined, // fillCallbackScope
            out);
    }

}

export default CanvasDataPlugin;