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
        var key = 'shape';
        var board = this.rexBoard.add.board({
            grid: this.rexBoard.add.hexagonGrid({
                x: 100,
                y: 100,
                size: 30,
                staggeraxis: 'x',
                staggerindex: 'odd'
            }),
            width: 8,
            height: 8
        });
        createGridPolygonTexture(board, key);
        board
            .forEachTileXY(function (tileXY, board) {
                var chess = this.add.image(0, 0, key)
                    .setTint(Random(0, 0xffffff));
                board.addChess(chess, tileXY.x, tileXY.y, 0, true);
            }, this)
            .destroy();
    }

    update() {}
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