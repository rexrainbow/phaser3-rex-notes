import CanvasToData from './canvasdata/CanvasToData.js';
import BooleanBuffer from '../../utils/arraybuffers/BooleanBuffer.js';
import FillAlpha from './fillcallbacks/alpha.js';

var TextObjectToBitMap = function (textObject, out) {
    return CanvasToData(
        textObject.canvas, // canvas
        undefined, undefined, undefined, undefined, // x, y, width, height
        BooleanBuffer, FillAlpha, undefined, // BufferClass, fillCallback, fillCallbackScope
        out);
};

export default TextObjectToBitMap;