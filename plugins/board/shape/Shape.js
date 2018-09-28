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
        }
    }
}

var shiftToO = function (points) {
    var minX = undefined,
        minY = undefined;
    var point;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        point = points[i];
        if ((minX === undefined) || (point.x < minX)) {
            minX = point.x;
        }
        if ((minY === undefined) || (point.y < minY)) {
            minY = point.y;
        }
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