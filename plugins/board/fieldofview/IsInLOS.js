import CONST from './const.js';
import AngleBetween from '../../utils/math/angle/Between.js';
import TileXYIsEqual from '../utils/TileXYIsEqual.js';

const INFINITY = CONST.INFINITY;

var IsInLOS = function (chess, visiblePoints) {
    // chess: chess object or tileXY
    if ((visiblePoints !== INFINITY) && (visiblePoints <= 0)) {
        return false;
    }

    var board = this.board;
    var targetTileXY = board.chessToTileXYZ(chess);
    if (!this.isInCone(targetTileXY)) {
        return false;
    }

    var myTileXYZ = this.chessData.tileXYZ;
    var out = board.tileXYToWorldXY(myTileXYZ.x, myTileXYZ.y, true);
    var startX = out.x,
        startY = out.y;
    out = board.tileXYToWorldXY(targetTileXY.x, targetTileXY.y, true);
    var endX = out.x,
        endY = out.y;
    var lineAngle = AngleBetween(startX, startY, endX, endY),
        offsetX, offsetY, isVisivle;
    // console.log('--')

    // Shift a small distance
    lineAngle += (Math.PI / 2);
    offsetX = 0.01 * Math.cos(lineAngle);
    offsetY = 0.01 * Math.sin(lineAngle);
    var x0 = startX + offsetX,
        y0 = startY + offsetY,
        x1 = endX + offsetX,
        y1 = endY + offsetY;
    if (this.debugGraphics) {
        this.debugGraphics.lineBetween(x0, y0, x1, y1);
    }
    board.lineToTileXYArray(x0, y0, x1, y1, globTileXYArray0);
    isVisivle = this.isPathVisible(globTileXYArray0, visiblePoints);
    // console.log(JSON.stringify(globTileXYArray0));        
    if (isVisivle) {
        globTileXYArray0.length = 0;
        return true;
    }

    // Shift a small distance
    lineAngle += Math.PI;
    offsetX = 0.01 * Math.cos(lineAngle);
    offsetY = 0.01 * Math.sin(lineAngle);
    var x0 = startX + offsetX,
        y0 = startY + offsetY,
        x1 = endX + offsetX,
        y1 = endY + offsetY;
    if (this.debugGraphics) {
        this.debugGraphics.lineBetween(x0, y0, x1, y1);
    }
    board.lineToTileXYArray(x0, y0, x1, y1, globTileXYArray1);
    // No need do visible checking if path is the same as previous one
    if (!TileXYIsEqual(globTileXYArray0, globTileXYArray1)) { 
        isVisivle = this.isPathVisible(globTileXYArray1, visiblePoints);
    }
    // console.log(JSON.stringify(globTileXYArray1));
    globTileXYArray0.length = 0;
    globTileXYArray1.length = 0;
    return isVisivle;
}

var globTileXYArray0 = [],
    globTileXYArray1 = [];
export default IsInLOS;