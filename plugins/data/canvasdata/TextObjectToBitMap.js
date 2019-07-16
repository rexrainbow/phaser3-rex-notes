import CanvasToData from './canvasdata/CanvasToData.js';
import BitBuffer from '../../utils/arraybuffers/BitBuffer.js';
import FillAlpha from './fill/FillAlpha.js';

var TextObjectToBitMap = function (textObject, out) {
    return CanvasToData(
        textObject.canvas, // canvas
        undefined, undefined, undefined, undefined, // x, y, width, height
        BitBuffer, FillAlpha, undefined, // BufferClass, fillCallback, fillCallbackScope
        out);
};

export default TextObjectToBitMap;