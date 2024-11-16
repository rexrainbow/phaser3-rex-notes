/*
shapeData: {
    strokeColor,
    strokeAlpha,
    pathData,
    lineWidth,
    closePath
}
*/
var Utils = Phaser.Renderer.WebGL.Utils;

var StrokePathWebGL = function (drawingContext, submitter, matrix, gameObject, shapeData, alpha, dx, dy) {
    var strokeTintColor = Utils.getTintAppendFloatAlpha(shapeData.strokeColor, shapeData.strokeAlpha * alpha);

    var path = shapeData.pathData;
    var pathLength = path.length - 1;
    var lineWidth = shapeData.lineWidth;
    var openPath = !shapeData.closePath;

    var strokePath = gameObject.customRenderNodes.StrokePath || gameObject.defaultRenderNodes.StrokePath;

    var pointPath = [];

    // Don't add the last point to open paths.
    if (openPath) {
        pathLength -= 2;
    }

    for (var i = 0; i < pathLength; i += 2) {
        var x = path[i] - dx;
        var y = path[i + 1] - dy;
        if (i > 0) {
            if (x === path[i - 2] && y === path[i - 1]) {
                // Duplicate point, skip it
                continue;
            }
        }
        pointPath.push({
            x: x,
            y: y,
            width: lineWidth
        });
    }

    strokePath.run(
        drawingContext,
        submitter,
        pointPath,
        lineWidth,
        openPath,
        matrix,
        strokeTintColor, strokeTintColor, strokeTintColor, strokeTintColor
    );
};

export default StrokePathWebGL;
