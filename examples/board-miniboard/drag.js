import BoardPlugin from '../../plugins/board-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

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


        var miniBoard = this.rexBoard.add.miniBoard(500, 150, {
            grid: grid,
            draggable: true
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

        miniBoard
            .on('dragstart', function (pointer, dragX, dragY) {
                this.pullOutFromMainBoard();
                this.setAlpha(0.3);
            }, miniBoard)
            .on('drag', function (pointer, dragX, dragY) {
                this.setPosition(dragX, dragY);
                if (this.isOverlapping(mainBoard)) {
                    this.setAlpha(0.7);
                    this.alignToMainBoard(mainBoard);
                } else {
                    this.setAlpha(0.3);
                }
            }, miniBoard)
            .on('dragend', function (pointer, dragX, dragY) {
                this.putOnMainBoard(mainBoard);
                if (this.mainBoard) {
                    this.setAlpha(1);
                }
            }, miniBoard);


        this.miniBoard = miniBoard;
        this.miniBoardState = this.add.text(20, 20, '');
    }

    update() {
        var s;
        if (this.miniBoard.mainBoard) {
            s = '(' + this.miniBoard.tileX + ',' + this.miniBoard.tileY + ')';
        } else {
            s = '--';
        }
        this.miniBoardState.setText(s);
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