import BoardPlugin from 'rexPlugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var staggeraxis = 'x';
        var staggerindex = 'odd';        
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        var board = this.rexBoard.add.board({
                grid: this.rexBoard.add.hexagonGrid({
                    x: 100,
                    y: 100,
                    size: 30,
                    staggeraxis: staggeraxis,
                    staggerindex: staggerindex
                }),
                width: 8,
                height: 8
            })
            .forEachTileXY(function (tileXY, board) {
                var poly = board.getGridPolygon(tileXY.x, tileXY.y);
                graphics.strokePoints(poly.points, true);
            }, this);

        var key = 'shape';
        createGridPolygonTexture(board, key);
        var chess = this.add.image(0, 0, key)
            .setTint(0x00CC00);
        board.addChess(chess, 0, 0, 0, true);
        chess.moveTo = this.rexBoard.add.moveTo(chess)
            .on('complete', function () {
                chess.moveTo.moveToDir(1);
            })
        chess.moveTo.moveToDir(1);
    }
}

var createGridPolygonTexture = function (board, key) {
    var poly = board.getGridPolygon();
    poly.left = 0;
    poly.top = 0;
    var scene = board.scene;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(poly.points, true)
        .generateTexture(key, poly.width, poly.height)
        .destroy();
    return scene.textures.get(key);
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