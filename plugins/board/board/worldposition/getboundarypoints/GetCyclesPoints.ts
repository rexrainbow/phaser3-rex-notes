import PointsToSegments from './PointsToSegments';
import Graph from './Graph';

var GetCyclesPoints = function(segments?: any, out?: any) {
    if (out === undefined) {
        out = [];
    }

    var remainderSegmentMap = new Map();
    segments.forEach(function(segment?: any) {
        remainderSegmentMap.set(JSON.stringify(segment), segment);
    });

    var graph = new Graph();
    graph.addEdges(segments);

    while (segments.length) {
        var segment = segments[0];
        var points = graph.findCycle(segment[0]);
        out.push(points);

        var cycleSegments = PointsToSegments(points);
        cycleSegments.forEach(function(segment?: any) {
            remainderSegmentMap.delete(JSON.stringify(segment))
        })

        segments = [...remainderSegmentMap.values()];
    }

    return out;
}

export default GetCyclesPoints;