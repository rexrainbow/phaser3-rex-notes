import 'phaser';
import {
    Board,
    QuadGrid, HexagonGrid,
    Shape,
    MoveTo, PathFinder
} from '../../plugins/board-components';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // create board
        var board = new MyBoard(this,
            {
                grid: GetHexagonGrid(),
                // grid: GetQuadGrid(),
                width: 8,
                height: 8,
                // wrap: true
            }
        );

        // add chess
        var chessA = new MyChess(board);

        // add some blockers
        for (var i = 0; i < 20; i++) {
            new Blocker(board);
        }

        chessA.showMoveableArea();
    }
}

var GetQuadGrid = function () {
    var grid = new QuadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var GetHexagonGrid = function () {
    var grid = new HexagonGrid({
        x: 100,
        y: 100,
        size: 30,
        staggeraxis: 'x',
        staggerindex: 'odd'
    })
    return grid;
};

class MyBoard extends Board {
    constructor(
        scene: Phaser.Scene,
        config: Board.IConfig
    ) {

        // create board
        super(scene, config);
        // draw grid
        var graphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_PRIMARY,
                alpha: 1
            }
        });
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            graphics.strokePoints(points, true);
        });
        // enable touch events
        this.setInteractive();
    }
}

class Blocker extends Shape {
    constructor(
        board: Board,
        tileXY?: { x: number, y: number }
    ) {

        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_DARK);
        scene.add.existing(this);
    }
}

class MyChess extends Shape {
    moveTo: MoveTo;
    pathFinder: PathFinder;
    _movingPoints: number;
    _markers: MoveableMarker[];

    constructor(
        board: Board,
        tileXY?: { x: number, y: number }
    ) {

        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_LIGHT);
        scene.add.existing(this);
        this.setDepth(1);

        // add behaviors        
        this.moveTo = new MoveTo(this);
        this.pathFinder = new PathFinder(this, {
            occupiedTest: true
        });

        // private members
        this._movingPoints = 4;
        this._markers = [];
    }

    showMoveableArea() {
        this.hideMoveableArea();
        var tileXYArray = this.pathFinder.findArea(this._movingPoints);
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            this._markers.push(
                new MoveableMarker(this, tileXYArray[i])
            );
        }
        return this;
    }

    hideMoveableArea() {
        for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
            this._markers[i].destroy();
        }
        this._markers.length = 0;
        return this;
    }

    moveToTile(endTile) {
        if (this.moveTo.isRunning) {
            return false;
        }
        var tileXYArray = this.pathFinder.getPath(endTile.rexChess.tileXYZ);
        this.moveAlongPath(tileXYArray);
        return true;
    }

    moveAlongPath(path) {
        if (path.length === 0) {
            this.showMoveableArea();
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        this.moveTo.moveTo(path.shift());
        return this;
    }
}

class MoveableMarker extends Shape {
    constructor(
        chess: MyChess,
        tileXY?: { x: number, y: number }
    ) {

        var board = Board.GetBoard(chess);
        var scene = chess.scene;
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, -1, COLOR2_DARK);
        scene.add.existing(this);
        this.setScale(0.5);

        // on pointer down, move to this tile
        this.on('board.pointerdown', function () {
            if (!chess.moveToTile(this)) {
                return;
            }
            this.setFillStyle(COLOR2_LIGHT);
        }, this);
    }
}

const COLOR_PRIMARY = 0x43a047;
const COLOR_LIGHT = 0x76d275;
const COLOR_DARK = 0x00701a;

const COLOR2_PRIMARY = 0xd81b60;
const COLOR2_LIGHT = 0xff5c8d;
const COLOR2_DARK = 0xa00037;

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);