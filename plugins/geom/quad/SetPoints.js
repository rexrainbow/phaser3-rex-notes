import InitPoints from '../utils/InitPoints.js';

var SetPoints = function (x, y, width, height, type, points) {
    if (points === undefined) {
        points = InitPoints(4);
    }

    var helfWidth = width / 2;
    var helfHeight = height / 2;

    if (type === 0) { // rectangle
        // top-right
        points[0].x = x + helfWidth;
        points[0].y = y - helfHeight;
        // bottom-right
        points[1].x = x + helfWidth;
        points[1].y = y + helfHeight;
        // bottom-left
        points[2].x = x - helfWidth;
        points[2].y = y + helfHeight;
        // top-left
        points[3].x = x - helfWidth;
        points[3].y = y - helfHeight;
    } else { // rhombus
        // 0
        points[0].x = x + helfWidth;
        points[0].y = y;
        // 90
        points[1].x = x;
        points[1].y = y + helfHeight;
        // 180
        points[2].x = x - helfWidth;
        points[2].y = y;
        // 270
        points[3].x = x;
        points[3].y = y - helfHeight;
    }
    return points;
}

export default SetPoints;