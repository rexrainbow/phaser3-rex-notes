import CONST from './const.js';

const INFINITY = CONST.INFINITY;

var IsInLOS = function (chess, visiblePoints) {
    // chess: chess object or tileXY
    if ((visiblePoints !== INFINITY) && (visiblePoints <= 0)) {
        return false;
    }

    // Debug
    if (lineGraphics === undefined) {
        lineGraphics = this.board.scene.add.graphics({
                lineStyle: {
                    width: 2,
                    color: 0xff0000,
                    alpha: 1
                }
            })
            .setDepth(10);
    }
    lineGraphics.clear();

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
    console.log('--');
    var grid = this.board.grid;
    var gridSize = Math.min(grid.cellWidth, grid.cellHeight) / 10;
    var lineAngle = Math.atan2(endX - startX, endY - startY);
    var offsetX = gridSize * Math.cos(lineAngle);
    var offsetY = gridSize * Math.sin(lineAngle);

    // Debugger
    lineGraphics.lineBetween(startX + offsetX, startY + offsetY, endX + offsetX, endY + offsetY);
    lineGraphics.lineBetween(startX - offsetX, startY - offsetY, endX - offsetX, endY - offsetY);


    // Shift a small distance
    board.lineToTileXYArray(
        startX + offsetX,
        startY + offsetY,
        endX + offsetX,
        endY + offsetY,
        globTileXYArray);
    var isVisivle = this.isPathVisible(globTileXYArray, visiblePoints);
    console.log('(' + (startX + offsetX) + ',' + (startY + offsetY) + ') --> (' + (endX + offsetX) + ',' + (endY + offsetY) + ')');
    console.log(JSON.stringify(globTileXYArray));
    globTileXYArray.length = 0;
    if (isVisivle) {
        return true;
    }

    // Shift a small distance
    board.lineToTileXYArray(
        startX - offsetX,
        startY - offsetY,
        endX - offsetX,
        endY - offsetY,
        globTileXYArray);
    var isVisivle = this.isPathVisible(globTileXYArray, visiblePoints);
    console.log('(' + (startX - offsetX) + ',' + (startY - offsetY) + ') --> (' + (endX - offsetX) + ',' + (endY - offsetY) + ')');
    console.log(JSON.stringify(globTileXYArray));
    globTileXYArray.length = 0;

    return isVisivle;
}

var globTileXYArray = [];
var lineGraphics = undefined;
export default IsInLOS;