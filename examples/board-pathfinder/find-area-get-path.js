import BoardPlugin from 'rexPlugins/board-plugin.js';

class Blocker extends Phaser.GameObjects.Image {
    constructor(board, tileXY) {
        var scene = board.scene;
        // create game object
        super(scene, 0, 0, scene.shapeTextureKey);
        scene.add.existing(this);
        this.setTint(0x555555);
        // add to board
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
        board.addChess(this, tileXY.x, tileXY.y, 0, true);
        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this);
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            blockerTest: true
        });

        // private members
        this.movingPoints = 4;
        this.moveableTiles = [];
    }

    showMoveableArea() {
        for (var i = 0, cnt = this.moveableTiles.length; i < cnt; i++) {
            this.moveableTiles[i].destroy();
        }
        this.moveableTiles.length = 0;
        var tileXYArray = this.pathFinder.findArea(this.movingPoints);
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            this.moveableTiles.push(
                new MoveableTile(this, tileXYArray[i])
            );
        }
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
    }
}

class MoveableTile extends Phaser.GameObjects.Image {
    constructor(chess, tileXY) {
        var scene = chess.scene;
        // create game object
        super(scene, 0, 0, scene.shapeTextureKey);
        scene.add.existing(this);
        this.setTint(0x330000).setScale(0.5);
        // add to board
        var board = chess.rexChess.board;
        board.addChess(this, tileXY.x, tileXY.y, -1, true);

        // on pointer down, move to this tile
        this.on('board.pointerdown', function () {
            if (!chess.moveToTile(this)) {
                return;
            }
            this.setTint(0xff0000);
        }, this);
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.board;
        this.shapeTextureKey = 'shape';
        this.blockers = [];
        this.chessA;
    }

    preload() {}

    create() {
        // create board
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        this.board = this.rexBoard.add.board({
                grid: getHexagonGrid(this),
                // grid: getQuadGrid(this),
                width: 8,
                height: 8
            })
            // draw grid
            .forEachTileXY(function (tileXY, board) {
                var poly = board.getGridPolygon(tileXY.x, tileXY.y);
                graphics.strokePoints(poly.points, true);
            }, this)
            .setInteractive();
        // create board

        // create grid texture
        createGridPolygonTexture(this.board, this.shapeTextureKey);
        // create grid texture

        // add chess
        this.chessA = new ChessA(this.board, this.board.getRandomEmptyTileXY(0));
        // add chess

        // add some blockers
        for (var i = 0; i < 20; i++) {
            this.blockers.push(
                new Blocker(this.board, this.board.getRandomEmptyTileXY(0))
            );
        }
        // add some blockers

        this.chessA.showMoveableArea(4);
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