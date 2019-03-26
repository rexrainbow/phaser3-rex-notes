import CONST from './const.js';
import AngleBetween from '../../utils/math/angle/Between.js';

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
    var grid = this.board.grid;
    var gridSize = Math.min(grid.cellWidth, grid.cellHeight) / 10;
    // console.log('--')


    // Shift a small distance
    lineAngle += (Math.PI / 2);
    offsetX = gridSize * Math.cos(lineAngle);
    offsetY = gridSize * Math.sin(lineAngle);
    board.lineToTileXYArray(
        startX + offsetX,
        startY + offsetY,
        endX + offsetX,
        endY + offsetY,
        globTileXYArray);
    isVisivle = this.isPathVisible(globTileXYArray, visiblePoints);
    // console.log(JSON.stringify(globTileXYArray));    
    globTileXYArray.length = 0;
    if (isVisivle) {
        return true;
    }

    // Shift a small distance
    lineAngle += Math.PI;
    offsetX = gridSize * Math.cos(lineAngle);
    offsetY = gridSize * Math.sin(lineAngle);
    board.lineToTileXYArray(
        startX + offsetX,
        startY + offsetY,
        endX + offsetX,
        endY + offsetY,
        globTileXYArray);
    isVisivle = this.isPathVisible(globTileXYArray, visiblePoints);
    // console.log(JSON.stringify(globTileXYArray));
    globTileXYArray.length = 0;

    return isVisivle;
}

var globTileXYArray = [];
export default IsInLOS;