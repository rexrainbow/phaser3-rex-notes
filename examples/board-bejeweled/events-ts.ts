import 'phaser';
import BoardPlugin from '../../plugins/board-plugin';
import Bejeweled from '../../templates/bejeweled/Bejeweled';

class Demo extends Phaser.Scene {
    rexBoard: BoardPlugin;
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        let bejeweled = new Bejeweled(this, {
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
                create: function (board: BoardPlugin.Board) {
                    let scene = board.scene as Demo;
                    let gameObject = scene.rexBoard.add.shape(board, 0, 0, 0, 0x0, 1, false)
                        .setScale(0.95)
                        // Initial 'symbol' value
                        .setData('symbol', undefined);
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event to change the appearance of game object via new symbol value
                    gameObject.on('changedata-symbol', function (gameObject: BoardPlugin.Shape, value: number, previousValue: number) {
                        gameObject.setFillStyle(GetColor(value));
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
        })
            .on('match', function (
                lines: Phaser.Structs.Set<BoardPlugin.Shape>[],
                board: BoardPlugin.Board,
                bejeweled: Bejeweled
            ) {

                // get Game object/tile position of matched lines
                for (let i = 0, icnt = lines.length; i < icnt; i++) {
                    let line = lines[i];
                    let s = [`Get matched ${line.size}`];
                    let chessArray = line.entries;
                    for (let j = 0, jcnt = chessArray.length; j < jcnt; j++) {
                        let gameObject = chessArray[j];
                        let tileXYZ = board.chessToTileXYZ(gameObject);
                        s.push(`(${tileXYZ.x},${tileXYZ.y})`);
                    }
                    console.log(s.join(' '));
                }
            })
            .on('eliminate', function (
                chessArray: BoardPlugin.Shape[],
                board: BoardPlugin.Board,
                bejeweled: Bejeweled
            ) {
                bejeweled.incData('scores', chessArray.length);
            })
            .setData('scores', 0)

        // Mointor 'scores' variable
        let txtScore = this.add.text(
            650, 30,
            bejeweled.getData('scores'),
            { fontSize: '24px', color: '#fff' }
        );
        bejeweled.on(
            'changedata-scores',
            function (bejeweled: Bejeweled, value: any, previousValue: any) {
                txtScore.setText(value);
            }
        );

        bejeweled.start();
    }

    update() { }
}

var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
var GetColor = function (symbol: number) {
    // symbols: [0, 1, 2, 3, 4, 5]
    return (colorArray[symbol * 60] as any).color;
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