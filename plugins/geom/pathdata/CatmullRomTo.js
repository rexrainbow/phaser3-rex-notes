//import CatmullRomInterpolation from '../../utils/math/interpolation/CatmullRomInterpolation.js';

const CatmullRomInterpolation = Phaser.Math.Interpolation.CatmullRom;

var CatmullRomTo = function (points, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];

    var xList = [p0x];
    var yList = [p0y];
    for (var i = 0, cnt = points.length; i < cnt; i += 2) {
        xList.push(points[i]);
        yList.push(points[i + 1]);
    }

    for (var i = 1, last = iterations - 1; i <= last; i++) {
        var t = i / last;
        pathData.push(
            CatmullRomInterpolation(xList, t),
            CatmullRomInterpolation(yList, t)
        );
    }
    return pathData;
}

export default CatmullRomTo;