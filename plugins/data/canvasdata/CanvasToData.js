import CanvasData from './CanvasData.js';

var CanvasToData = function (canvas, x, y, width, height, BufferClass, fillCallback, fillCallbackScope, out) {
    if (x === undefined) {
        x = 0;
    }
    if (y === undefined) {
        y = 0;
    }
    if (width === undefined) {
        width = canvas.width - x;
    }
    if (height === undefined) {
        height = canvas.height - y;
    }
    if (fillCallback === undefined) {
        fillCallback = BufferClass.FillCallback;
        fillCallbackScope = undefined;
    }
    if (out === undefined) {
        out = new CanvasData(width, height, BufferClass);
    }

    out.fill(canvas, x, y, width, height, fillCallback, fillCallbackScope);
    return out;
}
export default CanvasToData;