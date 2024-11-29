import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xff0000,
                alpha: 1
            }
        }).setDepth(1)

        var grid = this.rexBoard.add.quadGrid({
            cellWidth: 40,
            cellHeight: 40,
            type: 0
        });

        var miniBoard = this.rexBoard.add.miniBoard(400, 300, {
            grid: grid
        });

        var map = [
            '0  ',
            '000',
            '  0'
        ],
            line;
        for (var i = 0, icnt = map.length; i < icnt; i++) {
            line = map[i].split('');
            for (var j = 0, jcnt = line.length; j < jcnt; j++) {
                if (line[j] !== ' ') {
                    this.rexBoard.add.shape(miniBoard, j - 1, i - 1, 0, Random(0, 0xffffff));
                }
            }
        }

        graphics.strokeRectShape(miniBoard.getBounds());
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