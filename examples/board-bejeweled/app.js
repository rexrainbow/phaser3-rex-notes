import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import Bejeweled from '../../templates/bejeweled/Bejeweled.js';

const CELLSIZE = 60;
const PieceData = [
    // 0: #DC143C
    {
        key: 'diamond', color: 0xDC143C,
        swappable: true, clickable: false,
    },

    // 1: #1E90FF
    {
        key: 'diamond', color: 0x1E90FF,
        swappable: true, clickable: false,
    },

    // 2: #32CD32
    {
        key: 'diamond', color: 0x32CD32,
        swappable: true, clickable: false,
    },

    // 3: #FFD700
    {
        key: 'diamond', color: 0xFFD700,
        swappable: true, clickable: false,
    },

    // 4: #9400D3
    {
        key: 'diamond', color: 0x9400D3,
        swappable: true, clickable: false,
    },

    // 5: #FF8C00
    {
        key: 'diamond', color: 0xFF8C00,
        swappable: true, clickable: false,
    },

    // 6: #F5F5F5
    {
        key: 'horizontal', color: 0xF5F5F5,
        swappable: true, clickable: true,
    },

    // 7: #F5F5F5
    {
        key: 'vertical', color: 0xF5F5F5,
        swappable: true, clickable: true,
    },

    // 8: #F5F5F5
    {
        key: 'snowflake', color: 0xF5F5F5,
        swappable: true, clickable: true,
    },
]

var SetupChess = function (gameObject, value, previousValue) {
    var data = PieceData[value];
    gameObject
        .setTexture(data.key)
        .setTint(data.color)
        // Set 'swappable', 'clickable' properties by symbol (value)
        .setData('swappable', data.swappable)
        .setData('clickable', data.clickable)

    var size = CELLSIZE * 0.9;
    gameObject.setDisplaySize(size, size);
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('diamond', 'assets/images/diamond.png');
        this.load.image('horizontal', 'assets/images/horizontal-flip.png');
        this.load.image('vertical', 'assets/images/vertical-flip.png');
        this.load.image('fission', 'assets/images/fission.png');
        this.load.image('snowflake', 'assets/images/snowflake.png');
    }

    create() {
        var initSymbols = `\
01010101
01121010
10020101
00202210
01010101
10011010
00100101
01101010\
`.trim().split('\n').map(line => line.split('').map(ch => Number(ch)));

        var scene = this;
        var bejeweled = new Bejeweled(scene, {
            board: {
                x: 0,
                y: 0,
                cellWidth: CELLSIZE,
                cellHeight: CELLSIZE,
                width: 8,
                height: 8
            },
            initSymbols: initSymbols,
            chess: {
                // pick random symbol from array, or a callback to return symbol
                symbols: [0, 1, 2, 3, 4, 5],

                // User-defined chess game object
                create: function (board) {
                    // Create new chess game object
                    var scene = board.scene;
                    var gameObject = scene.add.image();
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event to change the appearance of game object via new symbol value
                    gameObject.setDataEnabled()
                        .data.events.on('changedata-symbol', SetupChess);
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
                    case 6: // horizontal
                        bejeweled.getChessArrayAtTileY(tileXY.y, chessArray);
                        break;

                    case 7: // vertical
                        bejeweled.getChessArrayAtTileX(tileXY.x, chessArray);
                        break;

                    case 8: // snowflake
                        bejeweled.getChessArrayAtTileY(tileXY.y - 1, chessArray);
                        bejeweled.getChessArrayAtTileY(tileXY.y, chessArray);
                        bejeweled.getChessArrayAtTileY(tileXY.y + 1, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x - 1, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x, chessArray);
                        bejeweled.getChessArrayAtTileX(tileXY.x + 1, chessArray);
                        break;

                }

                bejeweled.setEliminatingChess(chessArray);

            },

            eliminatingAction(chessArray, board, bejeweled) {
                const duration = 500; //ms
                for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
                    let gameObject = chessArray[i];
                    let tween = scene.tweens.add({
                        targets: gameObject,
                        alpha: 0,
                        duration: duration,
                        onComplete(tween, targets) { targets[0].destroy(); }
                    })
                    bejeweled.waitEvent(tween, 'complete');

                    let moveToXY = gameObject.getData('moveToXY');
                    if (moveToXY) {
                        scene.tweens.add({
                            targets: gameObject,
                            x: moveToXY.x,
                            y: moveToXY.y,
                            duration: duration - 10,
                        })
                    }

                    var newSymbol = gameObject.getData('newSymbol');

                    if (newSymbol !== undefined) {
                        var tileXYZ = gameObject.rexChess.tileXYZ;
                        var newChess = bejeweled.createChess(tileXYZ.x, tileXYZ.y, newSymbol).setAlpha(0);
                        let tween = scene.tweens.add({
                            targets: newChess,
                            alpha: 1,
                            delay: duration / 2,
                            duration: duration,
                        })
                        bejeweled.waitEvent(tween, 'complete');
                    }
                }
            },

            debug: true,
        })
            .on('match', function (lines, board, bejeweled) {
                // get Game object/tile position of matched lines
                for (const line of lines) {
                    const parts = [`Match ${line.size}`];
                    for (const piece of line) {
                        const { x, y } = board.chessToTileXYZ(piece);
                        parts.push(`(${x},${y})`);
                    }
                    console.log(parts.join(' '));
                }

                for (let i = 0; i < lines.length; i++) {
                    var setA = lines[i];
                    var hasIntersectionSet = false;

                    // Find intersection of 2 matched line
                    for (let j = i + 1; j < lines.length; j++) {
                        var setB = lines[j]
                        const intersectionSet = bejeweled.intersection(setA, setB);
                        if (intersectionSet.size === 0) {
                            continue;
                        }

                        // Has intersection, 
                        // Create 8(snowflake) at intersection tile position
                        hasIntersectionSet = true;
                        let intersectionChess, intersectionTileXYZ;

                        var coords = [];
                        for (var piece of intersectionSet) {
                            intersectionTileXYZ = board.chessToTileXYZ(piece);
                            if (intersectionTileXYZ) {
                                coords.push(`(${intersectionTileXYZ.x},${intersectionTileXYZ.y})`);
                            }
                            intersectionChess = piece;
                            break;
                        }
                        console.log(`Intersection Line ${i} ∩ Line ${j} -> ${intersectionSet.size}: ${coords.join(' ')}`);
                        intersectionChess.setData('newSymbol', 8);

                        // Move all chess in setA and setB to position of intersectionChess
                        var intersectionXY = { x: intersectionChess.x, y: intersectionChess.y };
                        for (var piece of setA) {
                            piece.setData('moveToXY', intersectionXY);
                        }
                        for (var piece of setB) {
                            piece.setData('moveToXY', intersectionXY);
                        }

                    }

                    // Does not have intersection, but set size is larger than 3
                    // Create 6(horizontal) or 7(vertical) chess
                    if (!hasIntersectionSet && (setA.size > 3)) {
                        var line = Array.from(setA);
                        var isHorizontal = line[0].rexChess.tileXYZ.y === line[1].rexChess.tileXYZ.y;
                        var newSymbol = (isHorizontal) ? 6 : 7;

                        var newChessXY;
                        var chess1 = bejeweled.getSelectedChess1();
                        var chess2 = bejeweled.getSelectedChess2();
                        if (setA.has(chess1)) {
                            chess1.setData('newSymbol', newSymbol);
                            newChessXY = { x: chess1.x, y: chess1.y };
                        } else if (setA.has(chess2)) {
                            chess2.setData('newSymbol', newSymbol);
                            newChessXY = { x: chess2.x, y: chess2.y };
                        }

                        for (var piece of setA) {
                            piece.setData('moveToXY', newChessXY);
                        }
                    }
                }
            })
            .on('eliminate', function (chessArray, board, bejeweled) {
                bejeweled.incData('scores', chessArray.length);
            })
            .setData('scores', 0)

        // Mointor 'scores' variable
        var txtScore = this.add.text(
            650, 30,
            bejeweled.getData('scores'),
            { fontSize: '24px', color: '#fff' }
        );
        bejeweled.on(
            'changedata-scores',
            function (bejeweled, value, previousValue) {
                txtScore.setText(value);
            });

        bejeweled.start();
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