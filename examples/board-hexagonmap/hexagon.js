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
        var print = this.add.text(0, 0, 'Click any tile');

        var staggeraxis = 'y';
        var staggerindex = 'odd';
        var board = this.rexBoard.add.board({
            grid: {
                gridType: 'hexagonGrid',
                x: 60,
                y: 60,
                size: 30,
                staggeraxis: staggeraxis,
                staggerindex: staggerindex
            }
        })
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                print.text = `${tileXY.x},${tileXY.y}`;
            })

        var tileXYArray = board.fit(this.rexBoard.hexagonMap.hexagon(board, 4));

        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        var tileXY, worldXY;
        for (var i in tileXYArray) {
            tileXY = tileXYArray[i];
            graphics.strokePoints(board.getGridPoints(tileXY.x, tileXY.y, true), true);

            worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y);
            this.add.text(worldXY.x, worldXY.y, `${tileXY.x},${tileXY.y}`).setOrigin(0.5);
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