import { Math as PhaserMath } from 'phaser';
//import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation';

const QuadraticBezierInterpolation = PhaserMath.Interpolation.QuadraticBezier;

var QuadraticBezierTo = function(cx?: any, cy?: any, x?: any, y?: any, iterations?: any, pathData?: any) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
        var t = i / last;
        pathData.push(
            QuadraticBezierInterpolation(t, p0x, cx, x),
            QuadraticBezierInterpolation(t, p0y, cy, y)
        );
    }
    return pathData;
}

export default QuadraticBezierTo;