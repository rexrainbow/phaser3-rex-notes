import DistanceBetween from '../../../utils/math/distance/DistanceBetween.js';
import Linear from '../../../utils/math/Linear.js';
import TileXYIsEqual from '../../utils/TileXYIsEqual.js';

var LineToTileXYArray = function (startX, startY, endX, endY, out) {
    if (out === undefined) {
        out = [];
    }

    var totalDistance = DistanceBetween(startX, startY, endX, endY);
    var gridSize = Math.min(this.grid.cellWidth, this.grid.cellHeight) / 2;
    var quantity = Math.ceil(totalDistance / gridSize),
        t;
    var worldX, worldY;
    var preTileXY, tileXY;
    for (var i = 0; i <= quantity; i++) {
        t = i / quantity;
        worldX = Linear(startX, endX, t);
        worldY = Linear(startY, endY, t);
        tileXY = this.worldXYToTileXY(worldX, worldY);
        if (!this.contains(tileXY.x, tileXY.y)) {
            continue;
        }
        if (preTileXY && TileXYIsEqual(preTileXY, tileXY)) {
            continue;
        }

        out.push(tileXY);
        preTileXY = tileXY;
    }
    return out;
}
export default LineToTileXYArray;