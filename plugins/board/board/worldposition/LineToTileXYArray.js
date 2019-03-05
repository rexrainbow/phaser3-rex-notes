import DistanceBetween from '../../../utils/math/distance/DistanceBetween.js';
import Linear from '../../../utils/math/Linear.js';

var LineToTileXYArray = function (startX, startY, endX, endY, out) {
    if (out === undefined) {
        out = [];
    }

    var totalDistance = DistanceBetween(startX, startY, endX, endY);
    var gridSize = Math.min(this.grid.cellWidth, this.grid.cellHeight);
    var quantity = Math.ceil(totalDistance / gridSize),
        t;
    var worldX, worldY;
    for (var i = 0; i <= quantity; i++) {
        t = i / quantity;
        worldX = Linear(startX, endX, t);
        worldY = Linear(startY, endY, t);
        out.push(this.worldXYToTileXY(worldX, worldY));
    }
    return out;
}
export default LineToTileXYArray;