import HexagonPlugin from 'rexPlugins/hexagon-plugin.js';
import BoardPlugin from 'rexPlugins/board-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 8,
            height: 8
        });
        var rexBoardAdd = this.rexBoard.add;
        board.forEachTileXY(function (tileXY, board) {
            var chess = rexBoardAdd.shape(board, tileXY.x, tileXY.y, 0, Random(0, 0xffffff));
            this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                console.log('down ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileup', function (pointer, tileXY) {
                console.log('up ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilemove', function (pointer, tileXY) {
                console.log('move ' + tileXY.x + ',' + tileXY.y);
            })
            .on('gameobjectdown', function (pointer, gameObject) {
                gameObject.setFillStyle(Random(0, 0xffffff));
            });

        this.board = board;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        var pointer = this.input.activePointer;
        var tileX = this.board.worldXYToTileX(pointer.x, pointer.y);
        var tileY = this.board.worldXYToTileY(pointer.x, pointer.y);
        this.print.setText(tileX + ',' + tileY);
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

var createGridPolygonTexture = function (board, key) {
    var poly = board.getGridPolygon();
    poly.left = 0;
    poly.top = 0;
    var scene = board.scene;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(poly.points, true)
        .generateTexture(key, poly.width, poly.height)
        .destroy();
    return scene.textures.get(key);
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexHexagon',
            plugin: HexagonPlugin,
            start: true
        }],
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);