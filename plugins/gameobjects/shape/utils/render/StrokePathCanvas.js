import LineStyleCanvas from './LineStyleCanvas.js';

/*
src: {
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
var StrokePathCanvas = function (ctx, src, dx, dy) {
    var isDashed = src.isDashed && !!src.strokePathData;
    var path = (!isDashed) ? src.pathData : src.strokePathData;
    if (!path || (path.length < 4)) {
        return;
    }

    var pathLength = path.length - 1;
    var px1 = path[0] - dx;
    var py1 = path[1] - dy;

    LineStyleCanvas(ctx, src);
    ctx.beginPath();

    if (!src.closePath) {
        pathLength -= 2;
    }

    if (!isDashed) {
        // Default behavior
        ctx.moveTo(px1, py1);
        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;
            ctx.lineTo(px2, py2);
        }

        if (src.closePath) {
            ctx.closePath();
        }

    } else {
        // Draw dashed line
        var strokePathMask = src.strokePathMask;
        var drawMaskIdx = 0;

        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;

            if (strokePathMask[drawMaskIdx]) {
                ctx.moveTo(px1, py1);
                ctx.lineTo(px2, py2);
            }

            px1 = px2;
            py1 = py2;
            drawMaskIdx++;
        }
    }

    ctx.stroke();
};

export default StrokePathCanvas;
