import {
    xyz2q,
    xyz2r
} from 'rexPlugins/utils/grid/hexagon/CubeTransfer.js';
import ForEachTile from './ForEachTile.js';

var GetParallelogramMap = function (board, type, width, height, callback, scope) {
    var tileXYArray = [];
    var mode = board.grid.mode;
    switch (type) {
        case 0:
            for (var q = 0; q <= width; q++) {
                for (var r = 0; r <= height; r++) {
                    tileXYArray.push({
                        x: xyz2q(mode, q, r, -q - r),
                        y: xyz2r(mode, q, r, -q - r)
                    });
                }
            }
            break;
        case 1:
            for (var s = 0; s <= width; s++) {
                for (var q = 0; q <= height; q++) {
                    tileXYArray.push({
                        x: xyz2q(mode, q, -q - s, s),
                        y: xyz2r(mode, q, -q - s, s)
                    });
                }
            }
            break;
        case 2:
            for (var r = 0; r <= width; r++) {
                for (var s = 0; s <= height; s++) {
                    tileXYArray.push({
                        x: xyz2q(mode, -r - s, r, s),
                        y: xyz2r(mode, -r - s, r, s)
                    });
                }
            }
            break;
    }

    return ForEachTile(tileXYArray, board, callback, scope);
}
export default GetParallelogramMap;