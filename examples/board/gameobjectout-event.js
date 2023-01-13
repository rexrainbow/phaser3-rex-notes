import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var board = this.rexBoard.add.board({
            grid: getQuadGrid(this),
            width: 4,
            height: 4
        })
            .forEachTileXY(function (tileXY, board) {
                var chess = this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0).setStrokeStyle(2, COLOR_LIGHT);
            }, this);

        board
            .setInteractive()
            .on('gameobjectover', function (pointer, gameObject) {
                gameObject.setFillStyle(COLOR_PRIMARY);
            })
            .on('gameobjectout', function (pointer, gameObject) {
                gameObject.setFillStyle();
            })

    }

    update(time, delta) { }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 100,
        y: 100,
        cellWidth: 50,
        cellHeight: 50,
    });
    return grid;
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