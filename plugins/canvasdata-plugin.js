import CanvasToData from './data/canvasdata/CanvasToData.js';
import BooleanBuffer from './data/canvasdata//buffers/BoolenaBuffer.js';
import ColorBuffer from './data/canvasdata/buffers/ColorBuffer.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;

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

    imageToCanvas(image, x, y, width, height) {
        if (this._tempCanvas === undefined) {
            this._tempCanvas = CanvasPool.create2D(this, width, height);
            this._tempContext = this._tempCanvas.getContext('2d');
        } else {
            this._tempCanvas.width = width;
            this._tempCanvas.height = height;
        }
        this._tempContext.drawImage(image, x, y, width, height);
        return this._tempCanvas;
    }

    textObjectToBitmap(textObject, out) {
        return CanvasToData(
            textObject.canvas, // canvas
            undefined, undefined, undefined, undefined, // x, y, width, height
            BooleanBuffer,  // BufferClass
            undefined, undefined, // fillCallback, fillCallbackScope
            out);
    }

    textureTColormap(key, frameName, out) {
        var frame;
        if (typeof (key) === 'string') {
            if (typeof (frameName) !== 'string') {
                out = frameName;
                frameName = undefined;
            }
            frame = this.textureManager.getFrame(key, frameName);
        } else {
            frame = key;
            out = frameName;
        }

        return CanvasToData(
            this.imageToCanvas(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight), // canvas
            undefined, undefined, undefined, undefined, // x, y, width, height
            ColorBuffer,  // BufferClass
            undefined, // fillCallback
            undefined, // fillCallbackScope
            out);
    }

}

export default CanvasDataPlugin;