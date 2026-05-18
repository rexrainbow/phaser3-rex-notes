import CanvasData from './CanvasData';

var CanvasToData = function(canvas?: any, x?: any, y?: any, width?: any, height?: any, BufferClass?: any, fillCallback?: any, fillCallbackScope?: any, out?: any) {
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
    if (out === undefined) {
        out = new CanvasData(BufferClass, width, height);
    }

    out.fill(canvas, x, y, width, height, fillCallback, fillCallbackScope);
    return out;
}
export default CanvasToData;