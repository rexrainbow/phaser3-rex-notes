import GetChessData from '../chess/GetChessData.js';

class Shape extends Phaser.GameObjects.Polygon {
    constructor(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
        if (addToBoard === undefined) {
            addToBoard = true;
        }
        var scene = board.scene;
        var worldX, worldY;
        if (addToBoard) {
            worldX = 0;
            worldY = 0;
        } else {
            worldX = tileX;
            worldY = tileY;
        }
        var points = board.getGridPoints(undefined, undefined, true);
        shiftToO(points);
        super(scene, worldX, worldY, points, fillColor, fillAlpha);

        if (addToBoard) {
            board.addChess(this, tileX, tileY, tileZ, true);
        } else {
            GetChessData(this);
        }
    }
}

var shiftToO = function (points) {
    var minX = Infinity;
    var minY = Infinity;
    var point;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        point = points[i];
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
    }
    if ((minX === 0) && (minY === 0)) {
        return points;
    }
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        point = points[i];
        point.x -= minX;
        point.y -= minY;
    }
    return points;
}

export default Shape;