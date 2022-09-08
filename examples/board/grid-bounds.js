import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var graphics = this.add.graphics();

        var board = this.rexBoard.add.board({
            // grid: getHexagonGrid(this),
            grid: getQuadGrid(this),
            width: 4,
            height: 4
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics
                    .lineStyle(1, COLOR_DARK, 1)
                    .strokePoints(points, true);

                var bounds = board.getGridBounds(tileXY.x, tileXY.y, true);
                graphics
                    .lineStyle(1, 0xff0000, 1)
                    .strokeRectShape(bounds);
            }, this);

        var bounds = board.getBoardBounds(true);
        graphics
            .lineStyle(1, 0x556B2F, 1)
            .strokeRectShape(bounds);

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
        size: 50,
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