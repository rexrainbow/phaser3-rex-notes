import SetPoints from '../../../geom/quad/SetPoints.js';
import InitPoints from '../../../geom/utils/InitPoints.js';

var GetGridPoints = function (tileX, tileY, points) {
    if (points === undefined) {
        points = InitPoints(4);
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
    var quadType = (this.mode === 0) ? 0 : 1;
    SetPoints(worldX, worldY, this.width, this.height, quadType, points);
    return points;
}

var tmpPoints = InitPoints(4);

export default GetGridPoints;