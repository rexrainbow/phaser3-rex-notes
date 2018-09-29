import {
    xyz2q,
    xyz2r
} from 'rexPlugins/utils/grid/hexagon/CubeTransfer.js';
import ForEachTile from './ForEachTile.js';

var ForEachTileInHexagonMap = function (board, radius, callback, scope) {
    var tileXYArray = [];
    var mode = board.grid.mode;
    var r1, r2;
    for (var q = -radius; q <= radius; q++) {
        r1 = Math.max(-radius, -q - radius);
        r2 = Math.min(radius, -q + radius);
        for (var r = r1; r <= r2; r++) {
            tileXYArray.push({
                x: xyz2q(mode, q, r, -q - r),
                y: xyz2r(mode, q, r, -q - r)
            });
        }
    }

    return ForEachTile(tileXYArray, board, callback, scope);
}
export default ForEachTileInHexagonMap;