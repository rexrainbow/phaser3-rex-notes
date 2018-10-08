import BoardPlugin from 'rexPlugins/board-plugin.js';

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
            x: 40,
            y: 40,
            cellWidth: 60,
            cellHeight: 60,
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


        var miniBoard = this.rexBoard.add.miniBoard(100, 100, grid),
            gameObject;
        for (var tileY = -1; tileY <= 1; tileY++) {
            for (var tileX = -1; tileX <= 1; tileX++) {
                gameObject = this.rexBoard.add.shape(miniBoard, 0, 0, 0, Random(0, 0xffffff), 1, false)
                    .setScale(0.7);
                miniBoard.addChess(gameObject, tileX, tileY, 0, true);
            }
        }
        miniBoard.setPosition(400, 300);
        miniBoard.putOnMainBoard(mainBoard, 4, 4, true);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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