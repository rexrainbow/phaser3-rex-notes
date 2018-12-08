import InitPoints from '../utils/InitPoints.js';
import DegToRad from '../../utils/math/DegToRad.js';

var SetPoints = function (x, y, size, type, points) {
    if (points === undefined) {
        points = InitPoints(6);
    }

    if (size === undefined) {
    } else if (typeof (size) === 'number') {
        var angleOffset = (type === 0) ? 0 : -30;
        var angleDeg, angleRad;
        for (var i = 0; i < 6; i++) {
            angleDeg = (60 * i) + angleOffset;
            angleRad = DegToRad(angleDeg);
            points[i].x = x + size * Math.cos(angleRad);
            points[i].y = y + size * Math.sin(angleRad);
        }
    } else {
        var config = size;
        var w = config.width;
        var h = config.height;
        if (type === 0) {
            points[0].x = x + (w / 2);
            points[0].y = y;

            points[1].x = x + (w / 4);
            points[1].y = y + (h / 2);

            points[2].x = x - (w / 4);
            points[2].y = y + (h / 2);

            points[3].x = x - (w / 2);
            points[3].y = y;

            points[4].x = x - (w / 4);
            points[4].y = y - (h / 2);

            points[5].x = x + (w / 4);
            points[5].y = y - (h / 2);
        } else {
            points[0].x = x + (w / 2);
            points[0].y = y - (h / 4);

            points[1].x = x + (w / 2);
            points[1].y = y + (h / 4);

            points[2].x = x;
            points[2].y = y + (h / 2);

            points[3].x = x - (w / 2);
            points[3].y = y + (h / 4);

            points[4].x = x - (w / 2);
            points[4].y = y - (h / 4);

            points[5].x = x;
            points[5].y = y - (h / 2);
        }
    }
    return points;
}

export default SetPoints;