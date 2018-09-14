import RhombusPlugin from 'rexPlugins/rhombus-plugin.js';
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
        var texture = createRhombusTexture(this, key);
        var image = texture.getSourceImage();

        var board = this.rexBoard.add.board({
            grid: this.rexBoard.add.quadGrid({
                x: 400,
                y: 100,
                cellWidth: image.width,
                cellHeight: image.height,
                type: 1, // isometric
                dir: 8
            }),
            width: 8,
            height: 8
        });

        var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
        board.forEachTileXY(function (tileXY, board) {
            var index = Random(0, 5);
            var chess = this.add.image(0, 0, key)
                .setData('symbol', index)
                .setTint(colorArray[index * 60].color);
            board.addChess(chess, tileXY.x, tileXY.y, 0, true);
            this.add.text(chess.x, chess.y, index)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);

        var match = this.rexBoard.add.match({
                board: board
            })
            .refreshSymbols(function (tileXY, board) {
                var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                if (chess == null) {
                    return null;
                }
                return chess.getData('symbol');
            })
            .match(3, function (matchedTileXY, dir, board) {
                var tileXY, chess;
                for (var i = 0, cnt = matchedTileXY.length; i < cnt; i++) {
                    tileXY = matchedTileXY[i];
                    chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                    chess.setScale(0.7);
                }
            });

        this.add.text(0, 0, 'Match count =' + match.matchedCount);
    }

    update() {}
}

var createRhombusTexture = function (scene, key) {
    var rhombus = new Phaser.Geom.rexRhombus(0, 0, 100, 50);

    var points = rhombus.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(rhombus.width), Math.floor(rhombus.height))
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
        global: [{
            key: 'rexRhombus',
            plugin: RhombusPlugin,
            start: true
        }],
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);