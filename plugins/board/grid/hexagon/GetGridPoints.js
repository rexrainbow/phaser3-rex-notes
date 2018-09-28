import SetPoints from 'rexPlugins/geom/hexagon/SetPoints.js';
import InitPoints from 'rexPlugins/geom/utils/InitPoints.js';

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
    var size = (this.staggeraxis === 0) ? (this.width / 2) : (this.height / 2);
    SetPoints(worldX, worldY, size, this.staggeraxis, points);
    return points;
}

var tmpPoints = InitPoints(6);

export default GetGridPoints;