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
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 20
        })
            .forEachTileXY(function (tileXY, board) {
                var chess = this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, 0x26418f, 0.7).setStrokeStyle(2, 0x8e99f3);
                this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                    .setOrigin(0.5)
            }, this);

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                console.log('down ' + tileXY.x + ',' + tileXY.y);
                var worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
                this.cameras.main.pan(worldXY.x, worldXY.y, 1000);
            }, this)

        this.board = board;
        this.print = this.add.text(0, 0, '').setScrollFactor(0);
    }

    update(time, delta) {
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
        x: 50,
        y: 50,
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