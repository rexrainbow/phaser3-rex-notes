import { Renderer as PhaserRenderer } from 'phaser';
/*
shapeData: {
    strokeColor,
    strokeAlpha,
    pathData,
    lineWidth,
    closePath,
    isDashed,
    strokePathData,
    strokePathMask
}
*/
var Utils = PhaserRenderer.WebGL.Utils;

var StrokePathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
    var strokeTintColor = Utils.getTintAppendFloatAlpha(shapeData.strokeColor, shapeData.strokeAlpha * alpha);
    var strokePath = gameObject.customRenderNodes.StrokePath || gameObject.defaultRenderNodes.StrokePath;

    var lineWidth = shapeData.lineWidth;
    var openPath = !shapeData.closePath;
    var isDashed = shapeData.isDashed && !!shapeData.strokePathData && !!shapeData.strokePathMask;

    // Helper method
    var RunStrokePath = function (pointPath, pathIsOpen) {
        if (pointPath.length < 2) {
            return;
        }

        strokePath.run(
            drawingContext,
            submitter,
            pointPath,
            lineWidth,
            pathIsOpen,
            calcMatrix,
            strokeTintColor,
            strokeTintColor,
            strokeTintColor,
            strokeTintColor
        );
    };

    if (!isDashed) {
        // Default behavior
        var path = shapeData.pathData;
        if (!path || path.length < 4) {
            return;
        }
        var pathLength = path.length - 1;

        // Don't add the last point to open paths.
        if (openPath) {
            pathLength -= 2;
        }

        var pointPath = [];
        for (var i = 0; i < pathLength; i += 2) {
            pointPath.push({
                x: path[i] - dx,
                y: path[i + 1] - dy,
                width: lineWidth
            });
        }

        RunStrokePath(pointPath, openPath);

    } else {
        // Dashed path data is a sequence of segment endpoints with a per-segment draw mask.
        var dashedPath = shapeData.strokePathData;
        if (!dashedPath || dashedPath.length < 4) {
            return;
        }
        var strokePathMask = shapeData.strokePathMask;
        var dashedPathLength = dashedPath.length - 1;

        if (openPath) {
            dashedPathLength -= 2;
        }

        var px1 = dashedPath[0] - dx;
        var py1 = dashedPath[1] - dy;

        var drawMaskIdx = 0;
        var pointPath = [];

        for (var j = 2; j < dashedPathLength; j += 2) {
            var px2 = dashedPath[j] - dx;
            var py2 = dashedPath[j + 1] - dy;

            // Build continuous line segments (pointPath)
            if (strokePathMask[drawMaskIdx]) {
                if (
                    pointPath.length === 0 ||
                    pointPath[pointPath.length - 1].x !== px1 ||
                    pointPath[pointPath.length - 1].y !== py1
                ) {
                    pointPath.push({
                        x: px1,
                        y: py1,
                        width: lineWidth
                    });
                }

                pointPath.push({
                    x: px2,
                    y: py2,
                    width: lineWidth
                });
            } else {
                RunStrokePath(pointPath, true);
                pointPath = [];

            }

            px1 = px2;
            py1 = py2;
            drawMaskIdx++;
        }

        RunStrokePath(pointPath, true);
    }

};

export default StrokePathWebGL;
