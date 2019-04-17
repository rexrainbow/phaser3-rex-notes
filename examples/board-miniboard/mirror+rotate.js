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
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });

        var grid = getQuadGrid(this);

        var mainBoard = this.rexBoard.add.board({
            grid: grid,
            width: 8,
            height: 8
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics.strokePoints(points, true);
            }, this);


        var miniBoard = this.rexBoard.add.miniBoard(100, 100, {
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
        miniBoard.putOnMainBoard(mainBoard, 4, 4, true);

        this.add.text(20, 20, 'Mirror X')
            .setInteractive()
            .on('pointerdown', function () {
                miniBoard.mirror('x');
            });
        this.add.text(20, 50, 'Mirror Y')
            .setInteractive()
            .on('pointerdown', function () {
                miniBoard.mirror('y');
            });
        this.add.text(20, 80, 'Rotate')
            .setInteractive()
            .on('pointerdown', function () {
                miniBoard.rotate(1);
            });
    }

    update() { }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 100,
        y: 200,
        cellWidth: 40,
        cellHeight: 40,
        type: 0
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 200,
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