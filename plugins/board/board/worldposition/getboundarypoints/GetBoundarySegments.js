import PointsToSegments from './PointsToSegments.js';

var GetBoundarySegments = function (board, tileXYArray) {
    var segmentMap = new Map();

    tileXYArray.forEach(function (tileXY) {
        var points = board.getGridPoints(tileXY.x, tileXY.y, true);
        var segments = PointsToSegments(points);
        segments.forEach(function (segment) {
            var key = JSON.stringify(segment); // line in json string
            segmentMap.set(key, (segmentMap.get(key) || 0) + 1)  // Count duplicated lines
        })
    })

    return Array.from(segmentMap.entries())
        // Remove duplicated lines
        .filter(function (entry) {
            return (entry[1] === 1)
        })
        // Reverse json string back to line [{x,y}, {x,y}]   
        .map(function (entry) {
            return JSON.parse(entry[0])
        })
}

export default GetBoundarySegments;