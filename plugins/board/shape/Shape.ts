import CreateChessData from '../chess/GetChessData';
import IsMiniBoardObject from './../miniboard/IsMiniBoardObject';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Base = PhaserGameObjects.Polygon;
class Shape extends Base {
    type: any;

    constructor(board?: any, tileX?: any, tileY?: any, tileZ?: any, fillColor?: any, fillAlpha?: any, addToBoard?: any) {
        if (addToBoard === undefined) {
            addToBoard = true;
        }

        // Chess-Container
        var isMiniBoard = IsMiniBoardObject(board),
            miniBoard;
        if (isMiniBoard?: any) {
            miniBoard = board;
            board = miniBoard.board;
        }

        var scene = board.scene;
        var worldX, worldY;
        if (addToBoard?: any) {
            worldX = 0;
            worldY = 0;
        } else {
            worldX = tileX;
            worldY = tileY;
        }
        var points = board.getGridPoints(undefined, undefined, true);
        ShiftToO(points);
        super(scene, worldX, worldY, points, fillColor, fillAlpha);
        this.type = 'rexShapeChess';

        if (addToBoard?: any) {
            if (isMiniBoard?: any) { // Chess-Container
                miniBoard.addChess(this, tileX, tileY, tileZ);
            } else {
                board.addChess(this, tileX, tileY, tileZ, true);
            }
        } else {
            CreateChessData(this);
        }
    }
}

var ShiftToO = function(points?: any) {
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