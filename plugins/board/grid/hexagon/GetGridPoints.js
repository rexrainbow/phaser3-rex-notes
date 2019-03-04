import SetPoints from '../../../geom/hexagon/SetPoints.js';
import InitPoints from '../../../geom/utils/InitPoints.js';

var GetGridPoints = function (tileX, tileY, points) {
    if (points === undefined) {
        points = InitPoints(6);
    } else if (points === true) {
        points = globPoints;
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
        size = globSize;
        size.width = this.width;
        size.height = this.height;
    }
    SetPoints(worldX, worldY, size, this.staggeraxis, points);
    return points;
}

var globPoints = InitPoints(6);
var globSize = {};

export default GetGridPoints;