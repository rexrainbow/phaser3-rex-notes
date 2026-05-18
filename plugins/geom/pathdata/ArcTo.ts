import LineTo from './LineTo';

import { Math as PhaserMath } from 'phaser';
const DegToRad = PhaserMath.DegToRad;

var ArcTo = function(centerX?: any, centerY?: any, radiusX?: any, radiusY?: any, startAngle?: any, endAngle?: any, antiClockWise?: any, iteration?: any, pathData?: any) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && (endAngle > startAngle)) {
        endAngle -= 360;
    } else if (!antiClockWise && (endAngle < startAngle)) {
        endAngle += 360;
    }

    var deltaAngle = endAngle - startAngle;
    var step = DegToRad(deltaAngle) / iteration;
    startAngle = DegToRad(startAngle);
    for (var i = 0; i <= iteration; i++) {
        var angle = startAngle + (step * i);
        var x = centerX + (radiusX * Math.cos(angle));
        var y = centerY + (radiusY * Math.sin(angle));
        LineTo(x, y, pathData);
    }
    return pathData;
}
export default ArcTo;