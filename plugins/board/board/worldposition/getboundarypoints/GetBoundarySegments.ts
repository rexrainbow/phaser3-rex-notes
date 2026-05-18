import PointsToSegments from './PointsToSegments';

var GetBoundarySegments = function(board?: any, tileXYArray?: any) {
    var segmentMap = new Map();

    tileXYArray.forEach(function(tileXY?: any) {
        var points = board.getGridPoints(tileXY.x, tileXY.y, true);
        var segments = PointsToSegments(points);
        segments.forEach(function(segment?: any) {
            var key = JSON.stringify(segment); // line in json string
            segmentMap.set(key, (segmentMap.get(key) || 0) + 1)  // Count duplicated lines
        })
    })

    return Array.from(segmentMap.entries())
        // Remove duplicated lines
        .filter(function(entry?: any) {
            return (entry[1] === 1)
        })
        // Reverse json string back to line [{x,y}, {x,y}]   
        .map(function(entry?: any) {
            return JSON.parse(entry[0])
        })
}

export default GetBoundarySegments;