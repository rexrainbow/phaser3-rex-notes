import 'phaser';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 8,
            height: 8
        })

        this.rexBoard.createTileTexture(board, 'tile', 0xffffff);

        board
            .forEachTileXY(function (tileXY, board) {
                board.addChess(
                    this.add.image(0, 0, 'tile').setAlpha(0.5),
                    tileXY.x, tileXY.y, 0
                );
            }, this)
            .setInteractive()
            .on('tileover', function (pointer, tileXY) {
                var tile = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                if (tile) {
                    tile.setAlpha(1)
                }
            })
            .on('tileout', function (pointer, tileXY) {
                var tile = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                if (tile) {
                    tile.setAlpha(0.5)
                }
            })
    }

    update() { }
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
        // cellWidth: 72,
        // cellHeight: 72,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

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