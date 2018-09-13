import HexagonPlugin from 'rexPlugins/hexagon-plugin.js';
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
        var staggeraxis = 'x';
        var staggerindex = 'odd';
        var key = 'shape';
        var texture = createHexagonTexture(this, key, staggeraxis, staggerindex);
        var image = texture.getSourceImage();

        var board = this.rexBoard.add.board({
            grid: this.rexBoard.add.hexagonGrid({
                x: 100,
                y: 100,
                cellWidth: image.width,
                cellHeight: image.height,
                staggeraxis: staggeraxis,
                staggerindex: staggerindex
            }),
            width: 8,
            height: 8
        });
        board.forEachTileXY(function (tileXY, board) {
            var chess = this.add.image(0, 0, key)
                .setTint(Random(0, 0xffffff));
            board.addChess(chess, tileXY.x, tileXY.y, 0, true);
            this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                console.log('down ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileup', function (pointer, tileXY) {
                console.log('up ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilemove', function (pointer, tileXY) {
                console.log('move ' + tileXY.x + ',' + tileXY.y);
            })
            .on('gameobjectdown', function (pointer, gameObject) {
                gameObject.setTint(Random(0, 0xffffff));
            });

        this.board = board;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        var pointer = this.input.activePointer;
        var tileXY = this.board.worldXYToTileXY(pointer.x, pointer.y);
        this.print.setText(tileXY.x + ',' + tileXY.y);
    }
}

var createHexagonTexture = function (scene, key, staggeraxis) {
    var hexagon = new Phaser.Geom.rexHexagon(0, 0, 30, staggeraxis);
    hexagon.left = 0;
    hexagon.top = 0;

    var points = hexagon.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(hexagon.width), Math.floor(hexagon.height))
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
            key: 'rexHexagon',
            plugin: HexagonPlugin,
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