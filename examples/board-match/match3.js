import RhombusPlugin from 'rexPlugins/rhombus-plugin.js';
import BoardPlugin from 'rexPlugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 8,
            height: 8
        });
        var key = 'shape';        
        createGridPolygonTexture(board, key);
        
        const Random = Phaser.Math.Between;
        var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
        board.forEachTileXY(function (tileXY, board) {
            var index = Random(0, 5);
            var chess = this.add.image(0, 0, key)
                .setData('symbol', index)
                .setTint(colorArray[index * 60].color);
            board.addChess(chess, tileXY.x, tileXY.y, 0, true);
            this.add.text(chess.x, chess.y, index)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);

        const GroupCall = Phaser.Actions.Call;
        var matchedCount = 0;
        var match = this.rexBoard.add.match({
                board: board
            })
            .refreshSymbols(function (tileXY, board) {
                var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                return (chess === null) ? null : chess.getData('symbol');
            })
            .match(3, function (result, board) {
                var chess = board.tileXYArrayToChess(result.tileXY, 0);
                GroupCall(chess, function (chess) {
                    chess.setScale(0.7);
                });
                matchedCount++;
            });

        this.add.text(0, 0, 'Match count= ' + matchedCount);
    }

    update() {}
}


var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        size: 30,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

var createGridPolygonTexture = function (board, key) {
    var poly = board.getGridPolygon();
    poly.left = 0;
    poly.top = 0;
    var scene = board.scene;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(poly.points, true)
        .generateTexture(key, poly.width, poly.height)
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
            key: 'rexRhombus',
            plugin: RhombusPlugin,
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