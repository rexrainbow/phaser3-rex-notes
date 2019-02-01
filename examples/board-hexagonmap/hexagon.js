import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var staggeraxis = 'y';
        var staggerindex = 'odd';
        var board = this.rexBoard.add.board({
            grid: {
                gridType: 'hexagonGrid',
                x: 40,
                y: 40,
                size: 30,
                staggeraxis: staggeraxis,
                staggerindex: staggerindex
            }
        });

        var tileXYArray = board.fit(this.rexBoard.hexagonMap.hexagon(board, 4));

        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        var tileXY;
        for (var i in tileXYArray) {
            tileXY = tileXYArray[i];
            graphics.strokePoints(board.getGridPoints(tileXY.x, tileXY.y, true), true);
        }
    }

    update() {}
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