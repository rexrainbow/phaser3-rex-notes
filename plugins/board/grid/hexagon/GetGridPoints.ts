import SetPoints from '../../../geom/hexagon/SetPoints';
import InitPoints from '../../../geom/utils/InitPoints';

var GetGridPoints = function(tileX?: any, tileY?: any, points?: any) {
    if (points === undefined) {
        points = InitPoints(6);
    } else if (points === true) {
        points = globPoints;
    }

    if (tileX === undefined) {
        globWorldXY.x = 0;
        globWorldXY.y = 0;
    } else {
        this.getWorldXY(tileX, tileY, globWorldXY);
    }
    var size;
    if (this.size !== undefined) {
        size = this.size;
    } else {
        size = globSize;
        size.width = this.width;
        size.height = this.height;
    }
    SetPoints(globWorldXY.x, globWorldXY.y, size, this.staggeraxis, points);
    return points;
}

var globPoints = InitPoints(6);
var globWorldXY = {};
var globSize = {};

export default GetGridPoints;