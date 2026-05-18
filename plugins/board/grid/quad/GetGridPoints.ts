import SetPoints from '../../../geom/quad/SetPoints';
import InitPoints from '../../../geom/utils/InitPoints';

var GetGridPoints = function(tileX?: any, tileY?: any, points?: any) {
    if (points === undefined) {
        points = InitPoints(4);
    } else if (points === true) {
        points = globPoints;
    }

    if (tileX === undefined) {
        globWorldXY.x = 0;
        globWorldXY.y = 0;
    } else {
        this.getWorldXY(tileX, tileY, globWorldXY);
    }
    var quadType = (this.mode === 0) ? 0 : 1;
    SetPoints(globWorldXY.x, globWorldXY.y, this.width, this.height, quadType, points);
    return points;
}

var globWorldXY = {};
var globPoints = InitPoints(4);

export default GetGridPoints;