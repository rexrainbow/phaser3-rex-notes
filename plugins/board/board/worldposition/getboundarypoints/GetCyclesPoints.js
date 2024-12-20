import PointsToSegments from './PointsToSegments.js';
import Graph from './Graph.js';

var GetCyclesPoints = function (segments, out) {
    if (out === undefined) {
        out = [];
    }

    var remainderSegmentMap = new Map();
    segments.forEach(function (segment) {
        remainderSegmentMap.set(JSON.stringify(segment), segment);
    });

    var graph = new Graph();
    graph.addEdges(segments);

    while (segments.length) {
        var segment = segments[0];
        var points = graph.findCycle(segment[0]);
        out.push(points);

        var cycleSegments = PointsToSegments(points);
        cycleSegments.forEach(function (segment) {
            remainderSegmentMap.delete(JSON.stringify(segment))
        })

        segments = [...remainderSegmentMap.values()];
    }

    return out;
}

export default GetCyclesPoints;
