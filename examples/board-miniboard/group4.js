import BoardPlugin from '../../plugins/board-plugin.js';
import UniqueItemListPlugin from '../../plugins/uniqueitemlist-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('board', 'assets/images/board/tiles.png', 'assets/images/board/tiles.json');
    }

    create() {
        var board = this.rexBoard.add.board({
            grid: getQuadGrid(this),
            width: 10,
            height: 10
        })
            .forEachTileXY(function (tileXY, board) {
                board.addChess(this.add.image(0, 0, 'board', 'tile0').setDisplaySize(34, 34),
                    tileXY.x, tileXY.y, 0, true);
                // var symbol = Phaser.Math.Between(0, 5);
                // board.addChess(this.add.image(0, 0, 'board', `chess${symbol}`).setData('symbol', symbol),
                //     tileXY.x, tileXY.y, 1, true);
            }, this);

        group4.call(board, board.tileZToChessArray(0));
    }

    update() {
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 50,
        y: 50,
        cellWidth: 32,
        cellHeight: 32,
        type: 0
    });
    return grid;
}

var group4 = function (candidates) {
    Phaser.Utils.Array.Shuffle(candidates);
    var out = [];
    var picked = {};
    var group, candidate, neighbors;
    for (var i = 0, icnt = candidates.length; i < icnt; i++) {
        candidate = candidates[i];
        var tileXYZ = candidate.rexChess.tileXYZ;
        var key = `${tileXYZ.x},${tileXYZ.y}`;
        if (picked.hasOwnProperty(key)) {
            continue;
        }

        group = [candidate];
        neighbors = this.getNeighborChess(candidate, -1);

    }
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
        global: [{
            key: 'rexUniqueItemList',
            plugin: UniqueItemListPlugin,
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