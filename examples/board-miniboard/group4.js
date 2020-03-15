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

        var groups = Group4(board, board.tileZToChessArray(0));
        for (var i = 0, icnt = groups.length; i < icnt; i++) {
            var tiles = groups[i].getItems();
            var symbol = Phaser.Math.Between(0, 5);
            for (var j = 0, jcnt = tiles.length; j < jcnt; j++) {
                var tileXY = tiles[j].rexChess.tileXYZ;                
                var chess = this.add.image(0, 0, 'board', `chess${symbol}`);
                board.addChess(chess, tileXY.x, tileXY.y, 1, true);
            }
        }
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

var Group4 = function (board, candidates) {
    var scene = board.scene;
    candidates = scene.plugins.get('rexUniqueItemList').add(candidates, { enableDestroyCallback: false })
        .shuffle();

    var groups = [];
    while (!candidates.isEmpty()) {
        groups.push(
            GetAGroup(board, candidates)
        )
    }
    return groups;
}

// Pick 4 connected tiles
var GetAGroup = function (board, candidates) {
    var scene = board.scene;
    var group = scene.plugins.get('rexUniqueItemList').add({ enableDestroyCallback: false });
    var tile = candidates.getLast();
    var neighbors;
    for (var i = 0; i < 4; i++) {
        group.add(tile);
        candidates.remove(tile);
        neighbors = GetNeighborsGroup(board, tile, neighbors);
        neighbors.intersect(candidates, neighbors);
        if (neighbors.length > 0) {
            tile = neighbors.popRandom();
        } else {
            break;
        }
    }
    return group;
}

// Get all neighbors of tiles
var GetNeighborsGroup = function (board, tile, out) {
    var scene = board.scene;
    if (out === undefined) {
        out = scene.plugins.get('rexUniqueItemList').add({ enableDestroyCallback: false });
    }
    out.addMultiple(
        board.getNeighborChess(tile, null)
    )
    return out;
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