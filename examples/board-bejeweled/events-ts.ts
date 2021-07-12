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
        this.data.set('scores', undefined);  // Initial 'scores' value
        var txtScore = this.add.text(650, 30, '?', {
            fontSize: '24px',
            color: '#fff'
        });

        this.data.events.on('changedata-scores', function (scene: Demo, value: number, previousValue: number) {
            txtScore.setText(value.toString());
        });
        this.data.set('scores', 0);

        var bejeweled = new Bejeweled(this, {
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
                create: function (board:BoardPlugin.Board) {
                    var scene = board.scene as Demo;
                    var gameObject = scene.rexBoard.add.shape(board, 0, 0, 0, 0x0, 1, false)
                        .setScale(0.95)
                        // Initial 'symbol' value
                        .setData('symbol', undefined);
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event to change the appearance of game object via new symbol value
                    gameObject.data.events.on('changedata-symbol', function (gameObject: BoardPlugin.Shape, value: number, previousValue: number) {
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
                board: BoardPlugin.Board
            ) {

                // get Game object/tile position of matched lines
                var line, gameObject, tileXYZ;
                for (var i = 0, icnt = lines.length; i < icnt; i++) {
                    line = lines[i];
                    var s = 'Get matched ' + line.size;
                    var chessArray = line.entries;
                    for (var j = 0, jcnt = chessArray.length; j < jcnt; j++) {
                        gameObject = chessArray[j];
                        tileXYZ = gameObject.rexChess.tileXYZ;
                        s += ' (' + tileXYZ.x + ',' + tileXYZ.y + ')';
                    }
                    console.log(s);
                }
            })
            .on('eliminate', function (
                chessArray: BoardPlugin.Shape[],
                board: BoardPlugin.Board
            ) {

                var scene = board.scene as Demo;
                // Accumulate scores 
                scene.data.set('scores', scene.data.get('scores') + chessArray.length);
            })

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