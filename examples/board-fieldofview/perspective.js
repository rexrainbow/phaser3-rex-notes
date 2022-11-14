import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import PerlinPlugin from '../../plugins/perlin-plugin.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const ChessColors = [0x558b2f, 0x7cb342, 0x9ccc65, 0xc5e1a5, 0xf1f8e9];

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var noise = this.plugins.get('rexPerlin').add();

        var fov;
        var chessArray = [];
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 16,
            // wrap: true
        })
            .forEachTileXY(function (tileXY, board) {
                var x = tileXY.x * 0.25,
                    y = tileXY.y * 0.25;
                var value = (noise.perlin2(x, y) + 1) / 2; // 0~1
                var index = Math.floor(value * 5);
                var color = ChessColors[index];
                this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, color)
                    .setData('terrainHeight', index)
            }, this)
            .setInteractive()
            .on('gameobjectdown', function (pointer, gameObject) {
                for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
                    chessArray[i].setStrokeStyle();
                }
                chessArray.length = 0;

                var tileXYArray = fov
                    .setChess(gameObject).setFace(fov.face + 1)
                    .clearDebugGraphics().findFOV();

                board.tileXYArrayToChessArray(tileXYArray, chessArray);
                for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
                    chessArray[i].setStrokeStyle(4, 0xFFA500);
                }

                gameObject.setStrokeStyle(4, 0xff0000);
                chessArray.push(gameObject);
            })

        fov = this.rexBoard.add.fieldOfView({
            perspective: true,
            coneMode: 'direction',
            cone: 2,

            preTestCallback(tileXYArray) {
                var chessArray = board.tileXYArrayToChessArray(tileXYArray);
                var startTerrainHeight = chessArray[0].getData('terrainHeight');
                var endTerrainHeight = chessArray[chessArray.length - 1].getData('terrainHeight');
                for (var i = chessArray.length - 2; i > 0; i--) {
                    var terrainHeight = chessArray[i].getData('terrainHeight');
                    if ((terrainHeight > startTerrainHeight) && (terrainHeight > endTerrainHeight)) {
                        return false;
                    }
                }
                return true;
            },
        });
    }

    update() { }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 50,
        cellHeight: 25,
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
        size: 20,
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
        global: [{
            key: 'rexPerlin',
            plugin: PerlinPlugin,
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