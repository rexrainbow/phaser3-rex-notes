import CONST from './const.js';
import AngleBetween from '../../utils/math/angle/Between.js';

const INFINITY = CONST.INFINITY;

var IsInLOS = function (chess, visiblePoints) {
    // chess: chess object or tileXY
    if ((visiblePoints !== INFINITY) && (visiblePoints <= 0)) {
        return false;
    }

    // Debug
    var dbgGraphics = this.board.scene.dbgGraphics;
    dbgGraphics.clear();

    var board = this.board;
    var targetTileXY = board.chessToTileXYZ(chess);
    if (!this.isInCone(targetTileXY)) {
        return false;
    }

    var myTileXYZ = this.chessData.tileXYZ;
    var startX = board.tileXYToWorldX(myTileXYZ.x, myTileXYZ.y),
        startY = board.tileXYToWorldY(myTileXYZ.x, myTileXYZ.y),
        endX = board.tileXYToWorldX(targetTileXY.x, targetTileXY.y),
        endY = board.tileXYToWorldY(targetTileXY.x, targetTileXY.y);
    var lineAngle = AngleBetween(startX, startY, endX, endY),
        offsetX, offsetY, isVisivle;
    var grid = this.board.grid;
    var gridSize = Math.min(grid.cellWidth, grid.cellHeight) / 10;
    console.log('--')


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
    console.log(JSON.stringify(globTileXYArray));
    dbgGraphics.lineStyle(3, 0xb0003a).lineBetween(startX + offsetX, startY + offsetY, endX + offsetX, endY + offsetY);
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
    console.log(JSON.stringify(globTileXYArray));
    dbgGraphics.lineStyle(3, 0xb0003a).lineBetween(startX + offsetX, startY + offsetY, endX + offsetX, endY + offsetY);
    globTileXYArray.length = 0;

    return isVisivle;
}

var globTileXYArray = [];
export default IsInLOS;