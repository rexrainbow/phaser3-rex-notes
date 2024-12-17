import GetTileXYArray from './GetTileXYArray.js';
import GetBoundarySegments from './GetBoundarySegments.js';
import GetCyclesPoints from './GetCyclesPoints.js';

var GetBoundaryPoints = function (chessArray, out) {
    var tileXYArray = GetTileXYArray(this, chessArray);
    var segments = GetBoundarySegments(this, tileXYArray);
    out = GetCyclesPoints(segments, out);
    return out;
}

export default GetBoundaryPoints;