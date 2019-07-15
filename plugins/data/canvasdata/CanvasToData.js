import CanvasData from './CanvasData.js';

var CanvasToData = function (canvas, BufferClass, fillCallback, fillCallbackScope, out) {
    if (fillCallback === undefined) {
        fillCallback = BufferClass.FillCallback;
        fillCallbackScope = undefined;
    }
    if (out === undefined) {
        out = new CanvasData(canvas, BufferClass);
    }
    out.fill(canvas, fillCallback, fillCallbackScope);
    return out;
}
export default CanvasToData;