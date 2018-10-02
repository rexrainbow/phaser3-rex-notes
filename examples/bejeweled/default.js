import Bejeweled from 'rexTemplates/bejeweled/Bejeweled.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.bejeweled = new Bejeweled(this, {
            // debug: true, // Show state changed log
            board: {
                grid: {
                    gridType: 'quadGrid',
                    x: 30,
                    y: 30 - 600,
                    cellWidth: 60,
                    cellHeight: 60,
                    type: 'orthogonal' // 'orthogonal'|'isometric'|'staggered'
                },
                width: 10,
                height: 20 // Prepared rows: upper 10 rows
            },
            match: {
                // wildcard: undefined
                // dirMask: undefined
            },
            chess: {
                // pick random symbol from array, or a callback to return symbol
                symbols: [0, 1, 2, 3, 4, 5],
                // symbols: function(board, tileX, tileY, excluded) { return symbol; }

                // User-defined chess game object
                create: function (board, tileX, tileY) {
                    var scene = board.scene;
                    var gameObject = scene.rexBoard.add.shape(board, 0, 0, 0, 0x0, 1, false)
                        .setScale(0.95)
                        .setData('symbol', undefined);
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event
                    gameObject.data.events.on('changedata_symbol', function (gameObject, value, previousValue) {
                        gameObject.setFillStyle(getColor(value));
                    });
                    return gameObject;
                },

                // scope for callbacks
                scope: undefined,

                // moveTo behavior
                moveTo: {
                    speed: 400
                },                
                // tileZ: 1,                
            },

            // callback of matched lines
            onMatchLinesCallback: function (lines, board) {
            },
            onMatchLinesCallbackScope: undefined,

            // callback of eliminating chess
            onEliminatingChessCallback: function (chess, board) {
                // return eventEmitter; // custom eliminating task, fires 'complete' event to continue FSM
            },
            onEliminatingChessCallbackScope: undefined,

            // callback of falling chess
            onFallingChessCallback: function (board) {
                // return eventEmitter; // custom falling task, fires 'complete' event to continue FSM
            },
            onFallingChessCallback: undefined,

        });
        this.bejeweled.start();
    }

    update() {}
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
    scene: Demo
};

var game = new Phaser.Game(config);