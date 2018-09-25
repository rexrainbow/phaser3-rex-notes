import BoardPlugin from 'rexPlugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.shapeTextureKey = 'shape';
        var board = new Board(this);

        // add some blockers
        for (var i = 0; i < 10; i++) {
            new Blocker(board);
        }

        // add chess
        var chessA = new ChessA(board);
        chessA.wander();
    }
}

class Board extends RexPlugins.Board.Board {
    constructor(scene) {
        // create board
        var config = {
            grid: getHexagonGrid(scene),
            // grid: getQuadGrid(scene),
            width: 8,
            height: 8,
            // wrap: true
        }
        super(scene, config);
        // draw grid
        var graphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        this.forEachTileXY(function (tileXY, board) {
            var poly = board.getGridPolygon(tileXY.x, tileXY.y);
            graphics.strokePoints(poly.points, true);
        })
        // create grid texture
        createGridPolygonTexture(this, scene.shapeTextureKey);
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
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

var createGridPolygonTexture = function (board, shapeTextureKey) {
    var poly = board.getGridPolygon();
    poly.left = 0;
    poly.top = 0;
    var scene = board.scene;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(poly.points, true)
        .generateTexture(shapeTextureKey, poly.width, poly.height)
        .destroy();
    return scene.textures.get(shapeTextureKey);
}

class Blocker extends Phaser.GameObjects.Image {
    constructor(board, tileXY) {
        var scene = board.scene;
        // create game object
        super(scene, 0, 0, scene.shapeTextureKey);
        scene.add.existing(this);
        this.setTint(0x555555);
        // add to board
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        board.addChess(this, tileXY.x, tileXY.y, 0, true);
        // set blocker
        this.rexChess.setBlocker();
    }
}

class ChessA extends Phaser.GameObjects.Image {
    constructor(board, tileXY) {
        var scene = board.scene;
        // create game object
        super(scene, 0, 0, scene.shapeTextureKey);
        scene.add.existing(this);
        this.setTint(0x00CC00);
        // add to board
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        board.addChess(this, tileXY.x, tileXY.y, 0, true);
        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this, {
            blockerTest: true
        });
    }

    wander() {
        if (this.moveTo.isRunning) {
            return;
        }
        this.moveTo
            .once('complete', function () {
                this.wander();
            }, this)
            .moveToRandomNeighbor();
    }
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