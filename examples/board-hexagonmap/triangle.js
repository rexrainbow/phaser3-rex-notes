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

        var tileXYArray = board.fit(this.rexBoard.hexagonMap.triangle(board, 0, 4));

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

    update() { }
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