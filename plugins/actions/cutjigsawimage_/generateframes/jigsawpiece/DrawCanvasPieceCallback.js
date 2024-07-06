import ConvertEdgeMode from './ConvertEdgeMode.js';

var DrawCanvasPieceCallback = function (
    image,
    context,

    sx, sy,
    width, height,
    totalWidth, totalHeight,

    edgeWidth, edgeHeight,
    edgeMode,

    drawShapeCallback
) {

    edgeMode = ConvertEdgeMode(edgeMode);

    // Already translate to dx, dy

    // context.save();

    context.clearRect(0, 0, width, height);

    drawShapeCallback(
        context,
        width, height,
        edgeWidth, edgeHeight,
        edgeMode
    );

    context.clip();

    var dx = 0,
        dy = 0,
        dWidth = width,
        dHeight = height;
    if (sx < 0) {
        dx -= sx;
        dWidth += sx;
        sx = 0;
    }
    if (sy < 0) {
        dy -= sy;
        dHeight += sy;
        sy = 0;
    }

    if ((sx + dWidth) > totalWidth) {
        dWidth = totalWidth - sx;
    }
    if ((sy + dHeight) > totalHeight) {
        dHeight = totalHeight - sy;
    }

    context.drawImage(
        image,  // image
        sx, sy, dWidth, dHeight,
        dx, dy, dWidth, dHeight
    );

    // context.restore();
}

export default DrawCanvasPieceCallback;