import {
    xyz2q,
    xyz2r
} from 'rexPlugins/utils/grid/hexagon/CubeTransfer.js';
import ForEachTile from './ForEachTile.js';

var GetTriangleMap = function (board, type, height, callback, scope) {
    var tileXYArray = [];
    var mode = board.grid.mode;
    var rStart, rEnd
    for (var q = 0; q <= height; q++) {
        if (type === 0) {
            rStart = 0;
            rEnd = height - q;
        } else {
            rStart = height - q;
            rEnd = height;
        }

        for (var r = rStart; r <= rEnd; r++) {
            tileXYArray.push({
                x: xyz2q(mode, q, r, -q - r),
                y: xyz2r(mode, q, r, -q - r)
            });
        }
    }

    return ForEachTile(tileXYArray, board, callback, scope);
}

export default GetTriangleMap;