import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import Bejeweled from '../../templates/bejeweled2/Bejeweled.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var initSymbols = `\
0123443210
5432112345
5432112345
0123443210
0123443210
5432612345
5432172345
0123443210
0123443210
5432112345\
`.trim().split('\n').map(line => line.split('').map(ch => Number(ch)));

        var bejeweled = new Bejeweled(this, {
            board: {
                x: 10,
                y: 10,
                cellSize: 40,
                width: 10,
                height: 10
            },
            initSymbols: initSymbols,
            chess: {
                // pick random symbol from array, or a callback to return symbol
                symbols: [0, 1, 2, 3, 4, 5],

                // User-defined chess game object
                create: function (board) {
                    var scene = board.scene;
                    var gameObject = scene.rexBoard.add.shape(board, 0, 0, 0, 0x0, 1, false)
                        .setScale(0.8)
                        // Initial 'symbol' value
                        .setData('symbol', undefined);
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event to change the appearance of game object via new symbol value
                    gameObject.data.events.on('changedata-symbol', function (gameObject, value, previousValue) {
                        gameObject.setFillStyle(GetColor(value));
                    });
                    return gameObject;
                },

                // moveTo behavior
                moveTo: {
                    speed: 400
                },
            },

            pickAction(chess, board, bejeweled) {
                var symbol = chess.getData('symbol');
                var tileXY = bejeweled.chessToTileXY(chess);

                var chessSet = new Phaser.Structs.Set();
                var chessArray = [];
                switch (symbol) {
                    case 6:
                        bejeweled.getChessArrayAtTileY(tileXY.y, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x, chessArray);
                        break;
                    case 7:
                        bejeweled.getChessArrayAtTileXYInRange(tileXY.x, tileXY.y, 3, 3, chessArray);
                        break;
                }

                chessArray.forEach(function (chess) {
                    chessSet.set(chess);
                })
                bejeweled.setEliminatingChess(chessSet.entries);

            },

            debug: true,
        })

            .on('fill.end', function () {
                bejeweled.movingDirection = (bejeweled.movingDirection + 1) % 4;
            })
            .start()
    }

    update() { }
}

var colors = [
    0xDC143C,  // 0: #DC143C
    0x1E90FF,  // 1: #1E90FF
    0x32CD32,  // 2: #32CD32
    0xFFD700,  // 3: #FFD700
    0x9400D3,  // 4: #9400D3
    0xFF8C00,  // 5: #FF8C00
    0x212121,  // 6: #212121
    0xF5F5F5,  // 7: #F5F5F5
]
var GetColor = function (symbol) {
    return colors[symbol];
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