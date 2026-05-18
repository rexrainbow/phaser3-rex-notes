import { Math as PhaserMath } from 'phaser';
const PointRotateAround = PhaserMath.RotateAround;

var RotateAround = function(polygon?: any, centerX?: any, centerY?: any, angle?: any) {
    var points = polygon.points;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        PointRotateAround(points[i], centerX, centerY, angle);
    }
    return polygon;
};

export default RotateAround;