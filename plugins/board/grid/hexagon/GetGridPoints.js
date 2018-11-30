import SetPoints from '../../../geom/hexagon/SetPoints.js';
import InitPoints from '../../../geom/utils/InitPoints.js';

var GetGridPoints = function (tileX, tileY, points) {
    if (points === undefined) {
        points = InitPoints(6);
    } else if (points === true) {
        points = tmpPoints;
    }

    var worldX, worldY;
    if (tileX === undefined) {
        worldX = 0;
        worldY = 0;
    } else {
        worldX = this.getWorldX(tileX, tileY);
        worldY = this.getWorldY(tileX, tileY);
    }
    var size;
    if (this.size !== undefined) {
        size = this.size;
    } else {
        size = tmpSize;
        size.width = this.width;
        size.height = this.height;
    }
    SetPoints(worldX, worldY, size, this.staggeraxis, points);
    return points;
}

var tmpPoints = InitPoints(6);
var tmpSize = {};

export default GetGridPoints;