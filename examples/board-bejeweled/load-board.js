import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import Bejeweled from '../../templates/bejeweled/Bejeweled.js';

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
                grid: {
                    x: 180,
                    y: 50,
                    cellWidth: 60,
                    cellHeight: 60,
                },
                width: 8,
                height: 16 // Prepared rows: upper 8 rows
            },
            chess: {
                // pick random symbol from array, or a callback to return symbol
                symbols: [0, 1, 2, 3, 4, 5],

                // User-defined chess game object
                create: function (board) {
                    var scene = board.scene;
                    var gameObject = scene.rexBoard.add.shape(board, 0, 0, 0, 0x0, 1, false)
                        .setScale(0.95)
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
            mask: true,

            debug: true,
        });
        bejeweled.start();

        var symbols = null;
        this.add.text(0, 0, 'Save', { fontSize: 40 })
            .setInteractive()
            .on('pointerup', function () {
                if (!bejeweled.isAwaitingInput()) {
                    return;
                }

                symbols = bejeweled.dumpSymbols();
                console.log(symbols)
            })

        this.add.text(0, 300, 'Load', { fontSize: 40 })
            .setInteractive()
            .on('pointerup', function () {
                if (!symbols) {
                    return;
                }

                bejeweled.reloadSymbols(symbols);
            })
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
    width: 768,
    height: 1334,
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