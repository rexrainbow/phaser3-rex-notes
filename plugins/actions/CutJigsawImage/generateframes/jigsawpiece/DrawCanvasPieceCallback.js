import ConvertEdgeMode from './ConvertEdgeMode.js';

var DrawCanvasPieceCallback = function (
    image,
    context,
    sx, sy,
    width, height,
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

    if (sx < 0) {
        sx = 0;
    }

    if (sy < 0) {
        sy = 0;
    }

    context.drawImage(
        image,  // image

        // sx, sy, sWidth, sHeight
        sx, sy, width, height,

        // dx, dy, dWidth, dHeight
        0, 0, width, height
    );

    // context.restore();
}

export default DrawCanvasPieceCallback;