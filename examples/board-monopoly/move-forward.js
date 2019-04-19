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

    preload() { }

    create() {
        var board = new Board(this, TILESMAP);
        var chessA = new ChessA(board, {
            x: 0,
            y: 0
        });

        var movingPointsTxt = this.add.text(10, 10, '');
        this.input.on('pointerdown', function (pointer) {
            var movingPoints = Between(1, 6);
            movingPointsTxt.setText(movingPoints)
            chessA.moveForward(movingPoints);
        });

        this.add.text(0, 580, 'Click to move forward.')
    }
}

const COLORMAP = [0x087f23, 0x4caf50];
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
        for (var tileY = 0, ycnt = tiles.length; tileY < ycnt; tileY++) {
            line = tiles[tileY];
            for (var tileX = 0, xcnt = line.length; tileX < xcnt; tileX++) {
                symbol = line[tileX];
                if (symbol === ' ') {
                    continue;
                }

                cost = parseFloat(symbol);
                this.scene.rexBoard.add.shape(this, tileX, tileY, 0, COLORMAP[cost])
                    .setStrokeStyle(1, 0xffffff, 1)
                    .setData('cost', cost);
            }
        }
        return this;
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 1, 0x3f51b5);
        scene.add.existing(this);
        this.setScale(0.9);

        // add behaviors        
        this.monopoly = scene.rexBoard.add.monopoly(this, {
            face: 0,
            pathTileZ: 0,
            costCallback: function (curTileXY, preTileXY, monopoly) {
                var board = monopoly.board;
                return board.tileXYZToChess(curTileXY.x, curTileXY.y, 0).getData('cost');
            },
        });
        this.moveTo = scene.rexBoard.add.moveTo(this);

        // private members
        this.movingPathTiles = [];
    }

    showMovingPath(tileXYArray) {
        this.hideMovingPath();
        var tileXY, worldXY;
        var scene = this.scene,
            board = this.rexChess.board;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
            this.movingPathTiles.push(scene.add.circle(worldXY.x, worldXY.y, 10, 0xb0003a));
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
        this.monopoly.setFace(this.moveTo.destinationDirection);
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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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