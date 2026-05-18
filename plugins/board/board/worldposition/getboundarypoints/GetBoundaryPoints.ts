import GetTileXYArray from './GetTileXYArray';
import GetBoundarySegments from './GetBoundarySegments';
import GetCyclesPoints from './GetCyclesPoints';

var GetBoundaryPoints = function(chessArray?: any, out?: any) {
    var tileXYArray = GetTileXYArray(this, chessArray);
    var segments = GetBoundarySegments(this, tileXYArray);
    out = GetCyclesPoints(segments, out);
    return out;
}

export default GetBoundaryPoints;