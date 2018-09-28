import InitPoints from '../utils/InitPoints.js';

const DegToRad = Phaser.Math.DegToRad;

var SetPoints = function (x, y, size, type, points) {
    if (points === undefined) {
        points = InitPoints(6);
    }

    var angleOffset = (type === 0) ? 0 : -30;
    var angleDeg, angleRad;
    for (var i = 0; i < 6; i++) {
        angleDeg = (60 * i) + angleOffset;
        angleRad = DegToRad(angleDeg);
        points[i].x = x + size * Math.cos(angleRad);
        points[i].y = y + size * Math.sin(angleRad);
    }
    return points;
}

export default SetPoints;