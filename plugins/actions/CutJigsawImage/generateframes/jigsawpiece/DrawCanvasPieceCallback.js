import ConvertEdgeMode from './ConvertEdgeMode.js';
import DefaultDrawShapeCallback from './DefaultDrawShapeCallback.js';

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

    context.drawImage(
        image,  // image
        sx, sy, width, height,
        0, 0, width, height
    );

    // context.restore();
}

export default DrawCanvasPieceCallback;