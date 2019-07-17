import CanvasToData from './canvasdata/CanvasToData.js';
import ColorBuffer from '../../utils/arraybuffers/FourBytesBuffer.js';
import FillColor from './fillcallbacks/color32.js';
import IsGameObject from '../../utils/system/IsGameObject.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var TextureTColorMap = function (key, frameName, out) {
    var frame;
    if (typeof (key) === 'string') {
        if (typeof (frameName) !== 'string') {
            out = frameName;
            frameName = undefined;
        }
        frame = this.textureManager.getFrame(key, frameName);
    } else {
        frame = (IsGameObject(key)) ? key.frame : key;
        out = frameName;
    }

    var hasDefaultCanvas = (this._tmpCanvas !== undefined);
    var canvas = (hasDefaultCanvas) ?
        this._tmpCanvas :
        CanvasPool.create2D(this, undefined, undefined, undefined, true);

    out = CanvasToData(
        DrawFrame(frame, canvas), // canvas
        undefined, undefined, undefined, undefined, // x, y, width, height
        ColorBuffer, FillColor, undefined, // BufferClass, fillCallback, fillCallbackScope
        out);

    if (!hasDefaultCanvas) {
        CanvasPool.remove(canvas);
    } else {
        canvas.width = 1;
        canvas.height = 1;
    }
    return out;
};

var DrawFrame = function (frame, canvas) {
    canvas.width = frame.cutWidth;
    canvas.height = frame.cutHeight;
    var context = canvas.getContext('2d');
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight);
    return canvas;
}

export default TextureTColorMap;