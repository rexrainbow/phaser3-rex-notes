import FillStyleCanvas from './FillStyleCanvas.js';

/*
src: {
    fillColor,
    fillAlpha,
    pathData,
    closePath
}
*/
var FillPathCanvas = function (ctx, src, dx, dy) {
    var path = src.pathData;
    if (!path || (path.length < 4)) {
        return;
    }

    var pathLength = path.length - 1;
    var px1 = path[0] - dx;
    var py1 = path[1] - dy;

    ctx.beginPath();
    ctx.moveTo(px1, py1);

    if (!src.closePath) {
        pathLength -= 2;
    }

    for (var i = 2; i < pathLength; i += 2) {
        var px2 = path[i] - dx;
        var py2 = path[i + 1] - dy;
        ctx.lineTo(px2, py2);
    }

    if (src.closePath) {
        ctx.closePath();
    }

    FillStyleCanvas(ctx, src);
    ctx.fill();
};

export default FillPathCanvas;
