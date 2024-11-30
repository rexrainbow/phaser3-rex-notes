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
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });

        var grid = this.rexBoard.add.quadGrid({
            x: 50,
            y: 80,
            cellWidth: 40,
            cellHeight: 40,
            type: 0
        });
        var mainBoard = this.rexBoard.add.board({
            grid: grid,
            width: 8,
            height: 8
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics.strokePoints(points, true);
            }, this);


        var map = [
            '0  ',
            '000',
            '0 0'
        ]
        CreateMiniBoard(this, mainBoard, 500, 150, 0x6495B1, map)

        var map = [
            '0  ',
            '000',
            '  0'
        ]
        CreateMiniBoard(this, mainBoard, 500, 150, 0x669966, map)



        this.miniBoard = null;
        this.miniBoardState = this.add.text(20, 20, '');
    }

    update() {
        var s;
        if (this.miniBoard) {
            s = '(' + this.miniBoard.tileX + ',' + this.miniBoard.tileY + ')';
        } else {
            s = '--';
        }
        this.miniBoardState.setText(s);
    }
}

var CreateMiniBoard = function (scene, mainBoard, x, y, color, map) {
    var miniBoard = scene.rexBoard.add.miniBoard(x, y, {
        grid: mainBoard.grid,
        draggable: true
    });

    var line;
    for (var i = 0, icnt = map.length; i < icnt; i++) {
        line = map[i].split('');
        for (var j = 0, jcnt = line.length; j < jcnt; j++) {
            if (line[j] !== ' ') {
                scene.rexBoard.add.shape(miniBoard, j - 1, i - 1, 0, color).setStrokeStyle(2, 0xffffff);
            }
        }
    }

    miniBoard
        .on('dragstart', function (pointer, dragX, dragY) {
            this.pullOutFromMainBoard();
            this.setAlpha(0.5);
            scene.miniBoard = null;
        }, miniBoard)
        .on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            if (this.isOverlapping(mainBoard)) {
                this.setAlpha(0.7);
                this.alignToMainBoard(mainBoard);
            } else {
                this.setAlpha(0.5);
            }
        }, miniBoard)
        .on('dragend', function (pointer, dragX, dragY) {
            this.putOnMainBoard(mainBoard);
            this.setAlpha(1);
            if (miniBoard.mainBoard) {
                scene.miniBoard = miniBoard;
            }
            console.log(mainBoard.getAllChess())
        }, miniBoard);

    return miniBoard;
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