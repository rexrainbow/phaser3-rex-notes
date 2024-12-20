var PointsToSegments = function (points) {
    var segments = [];
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        segments.push(BuildSegment(points[i], points[(i + 1) % cnt]));
    }

    return segments;
}

var BuildSegment = function (p0, p1) {
    var segment = [p0, p1];
    segment = segment.sort(function (a, b) { return (a.x === b.x) ? (a.y - b.y) : (a.x - b.x); });
    return segment;
}

export default PointsToSegments;