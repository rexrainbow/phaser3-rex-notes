import BoardPlugin from '../../plugins/board-plugin.js';

const TILESMAP = [
    '111 111',
    '1 1 1 1',
    '1101011',
    '  1 1  ',
    '1101011',    
    '1 1 1 1',
    '111 111'
];
const Between = Phaser.Math.Between;
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var board = new Board(this, TILESMAP);
        var chessA = new ChessA(board, {
            x: 0,
            y: 0
        });

        var movingPointsTxt = this.add.text(0, 0, '');
        this.input.on('pointerdown', function (pointer) {
            var movingPoints = Between(1, 6);
            movingPointsTxt.setText(movingPoints)
            chessA.moveForward(movingPoints);
        });
    }
}

const COLORMAP = [0x005500, 0x00AA00, 0x00FF00];
class Board extends RexPlugins.Board.Board {
    constructor(scene, tilesMap) {
        var tiles = createTileMap(TILESMAP);
        // create board
        var config = {
            // grid: getHexagonGrid(scene),
            grid: getQuadGrid(scene),
            width: tiles[0].length,
            height: tiles.length,
            // wrap: true
        }
        super(scene, config);
        this.createPath(tiles);
    }

    createPath(tiles) {
        // tiles : 2d array
        var line, symbol, cost;
        var rexBoardAdd = this.scene.rexBoard.add
        for (var tileY = 0, ycnt = tiles.length; tileY < ycnt; tileY++) {
            line = tiles[tileY];
            for (var tileX = 0, xcnt = line.length; tileX < xcnt; tileX++) {
                symbol = line[tileX];
                if (symbol === ' ') {
                    continue;
                }

                cost = parseFloat(symbol);
                rexBoardAdd.shape(this, tileX, tileY, 0, COLORMAP[cost])
                    .setScale(0.95)
                    .setData('cost', cost);
            }
        }
        return this;
    }

    getTileCost(tileXY) {
        return this.tileXYZToChess(tileXY.x, tileXY.y, 0).getData('cost');
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 1, 0x000055);
        scene.add.existing(this);
        this.setScale(0.9);

        // add behaviors        
        this.monopoly = scene.rexBoard.add.monopoly(this, {
            face: 0,
            pathTileZ: 0,
            costCallback: board.getTileCost,
            costCallbackScope: board
        });
        this.moveTo = scene.rexBoard.add.moveTo(this);

        // private members
        this.movingPathTiles = [];
    }

    showMovingPath(tileXYArray) {
        this.hideMovingPath();
        var tileXY;
        var scene = this.scene,
            board = this.rexChess.board;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            var shape = scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, -1, 0xffffff)
                .setScale(0.3)
            this.movingPathTiles.push(shape);
        }
    }

    hideMovingPath() {
        for (var i = 0, cnt = this.movingPathTiles.length; i < cnt; i++) {
            this.movingPathTiles[i].destroy();
        }
        this.movingPathTiles.length = 0;
        return this;
    }

    moveForward(movingPoints) {
        if (this.moveTo.isRunning) {
            return this;
        }

        var path = this.monopoly.getPath(movingPoints);
        this.showMovingPath(path);
        this.moveAlongPath(path);
        return this;
    }
    moveAlongPath(path) {
        if (path.length === 0) {
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        var tileData = path.shift();
        this.moveTo.moveTo(tileData);
        this.monopoly.setFaceDirection(this.moveTo.destinationDirection);
        return this;
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 100,
        y: 100,
        cellWidth: 50,
        cellHeight: 50,
        type: 0
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        size: 30,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

var createTileMap = function (tilesMap, out) {
    if (out === undefined) {
        out = [];
    }
    for (var i = 0, cnt = tilesMap.length; i < cnt; i++) {
        out.push(tilesMap[i].split(''));
    }
    return out;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);