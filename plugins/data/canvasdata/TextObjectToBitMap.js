import CanvasToData from './canvasdata/CanvasToData.js';
import BooleanBuffer from './buffers/BoolenaBuffer.js';

var TextObjectToBitMap = function (textObject, out) {
    return CanvasToData(
        textObject.canvas, // canvas
        undefined, undefined, undefined, undefined, // x, y, width, height
        BooleanBuffer,  // BufferClass
        undefined, undefined, // fillCallback, fillCallbackScope
        out);
};

export default TextObjectToBitMap;