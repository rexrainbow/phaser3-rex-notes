var Offset = function (hexagon, x, y) {
    var points = hexagon.points,
        point;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        point = points[i];
        point.x += x;
        point.y += y;
    }
    return hexagon;
};

export default Offset;