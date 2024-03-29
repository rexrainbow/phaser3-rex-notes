import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');
        var config = {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 8,
            height: 8,
            // wrap: true
        }
        var board = new Board(this, config);
        board
            .fillChess()
            .refreshSymbols()
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                var out = board.group(tileXY.x, tileXY.y);
                print.text = `Group size= ${out.length}`;
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
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

const Random = Phaser.Math.Between;
var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        // create board
        super(scene, config);
        // draw grid
        var graphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            graphics.strokePoints(points, true);
        });

        this.match = scene.rexBoard.add.match({
            board: this
        });
    }

    fillChess() {
        var scene = this.scene;
        this.forEachTileXY(function (tileXY, board) {
            var index = Random(0, 5);
            var chess = scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, colorArray[index * 60].color)
                .setData('symbol', index);
            scene.add.text(chess.x, chess.y, index)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);
        return this;
    }

    refreshSymbols() {
        this.match.refreshSymbols(function (tileXY, board) {
            var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
            return (chess === null) ? null : chess.getData('symbol');
        });
        return this;
    }

    group(tileX, tileY) {
        var out = this.match.group(tileX, tileY);
        var chess = this.tileXYArrayToChessArray(out, 0);
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            chess[i].setScale(0.7);
        }
        return chess;
    }
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