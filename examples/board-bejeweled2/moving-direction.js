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
        var bejeweled = new Bejeweled(this, {
            board: {
                x: 10,
                y: 10,
                cellSize: 40,
                width: 10,
                height: 10
            },
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
                        gameObject.setFillStyle(getColor(value));
                    });
                    return gameObject;
                },

                // moveTo behavior
                moveTo: {
                    speed: 400
                },
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

var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
var getColor = function (symbol) {
    // symbols: [0, 1, 2, 3, 4, 5]
    return colorArray[symbol * 60].color;
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