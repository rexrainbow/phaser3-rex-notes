import InitPoints from '../utils/InitPoints';

var SetPoints = function(x?: any, y?: any, width?: any, height?: any, type?: any, points?: any) {
    if (points === undefined) {
        points = InitPoints(4);
    }

    var halfW = width / 2;
    var halfH = height / 2;

    if (type === 0) { // rectangle
        // top-right
        points[0].x = x + halfW;
        points[0].y = y - halfH;
        // bottom-right
        points[1].x = x + halfW;
        points[1].y = y + halfH;
        // bottom-left
        points[2].x = x - halfW;
        points[2].y = y + halfH;
        // top-left
        points[3].x = x - halfW;
        points[3].y = y - halfH;
    } else { // rhombus
        // 0
        points[0].x = x + halfW;
        points[0].y = y;
        // 90
        points[1].x = x;
        points[1].y = y + halfH;
        // 180
        points[2].x = x - halfW;
        points[2].y = y;
        // 270
        points[3].x = x;
        points[3].y = y - halfH;
    }
    return points;
}

export default SetPoints;