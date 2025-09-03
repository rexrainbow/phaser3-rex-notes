import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import Bejeweled from '../../templates/bejeweled/Bejeweled.js';

const CELLSIZE = 60;
const ItemData = [
    // 0: #DC143C
    {
        key: 'diamond', color: 0xDC143C,
        swappable: true, clickable: false
    },

    // 1: #1E90FF
    {
        key: 'diamond', color: 0x1E90FF,
        swappable: true, clickable: false
    },

    // 2: #32CD32
    {
        key: 'diamond', color: 0x32CD32,
        swappable: true, clickable: false
    },

    // 3: #FFD700
    {
        key: 'diamond', color: 0xFFD700,
        swappable: true, clickable: false
    },

    // 4: #9400D3
    {
        key: 'diamond', color: 0x9400D3,
        swappable: true, clickable: false
    },

    // 5: #FF8C00
    {
        key: 'diamond', color: 0xFF8C00,
        swappable: true, clickable: false
    },

    // 6: #F5F5F5
    {
        key: 'snowflake', color: 0xF5F5F5,
        swappable: true, clickable: true
    },

    // 7: #F5F5F5
    {
        key: 'fission', color: 0xF5F5F5,
        swappable: true, clickable: true
    },
]

var SetupChess = function (gameObject, value, previousValue) {
    var data = ItemData[value];
    gameObject
        .setTexture(data.key)
        .setTint(data.color)
        .setData('swappable', data.swappable)
        .setData('clickable', data.clickable)

    var size = CELLSIZE * 0.9;
    gameObject.setDisplaySize(size, size);
}


const probabilities = [
    15.8333, // 0
    15.8333, // 1
    15.8333, // 2
    15.8333, // 3
    15.8333, // 4
    15.8333, // 5
    4,       // 6
    1        // 7
];

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('diamond', 'assets/images/diamond.png');
        this.load.image('fission', 'assets/images/fission.png');
        this.load.image('snowflake', 'assets/images/snowflake.png');
    }

    create() {
        this.bejeweled = new Bejeweled(this, {
            board: {
                x: 0,
                y: 0,
                cellWidth: CELLSIZE,
                cellHeight: CELLSIZE,
                width: 10,
                height: 10
            },
            // initSymbols: initSymbols,
            chess: {
                // pick random symbol from array, or a callback to return symbol
                symbols() {
                    const rand = Math.random() * 100;
                    let sum = 0;
                    for (let i = 0; i < probabilities.length; i++) {
                        sum += probabilities[i];
                        if (rand < sum) {
                            return i;
                        }
                    }
                    return probabilities.length - 1;
                },

                // User-defined chess game object
                create: function (board) {
                    var scene = board.scene;
                    var gameObject = scene.add.image()
                        // Initial 'symbol' value
                        .setData('symbol', undefined);
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event to change the appearance of game object via new symbol value
                    gameObject.data.events.on('changedata-symbol', SetupChess);
                    return gameObject;
                },

                // moveTo behavior
                moveTo: {
                    speed: 400
                },
            },

            match: {
                accept: [0, 1, 2, 3, 4, 5],
            },

            clickAction(chess, board, bejeweled) {
                var symbol = chess.getData('symbol');
                var tileXY = bejeweled.chessToTileXY(chess);

                var chessArray = [];
                switch (symbol) {
                    case 6:
                        bejeweled.getChessArrayAtTileY(tileXY.y - 1, chessArray);
                        bejeweled.getChessArrayAtTileY(tileXY.y, chessArray);
                        bejeweled.getChessArrayAtTileY(tileXY.y + 1, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x - 1, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x + 1, chessArray);
                        break;
                    case 7:
                        bejeweled.getChessArrayAtTileXYInRange(tileXY.x, tileXY.y, 3, 3, chessArray);
                        break;
                }

                bejeweled.setEliminatingChess(chessArray);

            },

            debug: true,
        });
        this.bejeweled.start();
    }

    update() { }
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