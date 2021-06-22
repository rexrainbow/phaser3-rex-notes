import 'phaser';
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
            grid: this.rexBoard.add.quadGrid({
                x: 100,
                y: 100,
                cellWidth: 32,
                cellHeight: 32,
                type: 0
            }),
            width: 10,
            height: 10
        })
            .forEachTileXY(function (tileXY, board) {
                board.addChess(this.add.image(0, 0, 'board', 'tile0').setDisplaySize(34, 34),
                    tileXY.x, tileXY.y, 0, true);
            }, this);

        var tiles = board.tileZToChessArray(0);
        tiles.sort(function (tileA, tileB) {
            var tileXYA = tileA.rexChess.tileXYZ;
            var tileXYB = tileB.rexChess.tileXYZ;
            var distA = Phaser.Math.Distance.Squared(tileXYA.x, tileXYA.y, 5, 5);
            var distB = Phaser.Math.Distance.Squared(tileXYB.x, tileXYB.y, 5, 5);
            return distA - distB;
        });
        var candidates = this.plugins.get('rexUniqueItemList').add({ autoCleanup: false })
            .addMultiple(tiles)
            .reverse()

        var RunTask = function (board, candidates) {
            var tiles = GetAGroup(board, candidates).getItems();
            var symbol = Phaser.Math.Between(0, 5);
            FillChess(board, tiles, 'board', `chess${symbol}`);
            if (candidates.length > 0) {
                this.time.delayedCall(500, RunTask, [board, candidates], this);
            }
        }
        RunTask.call(this, board, candidates);
    }

    update() {
    }
}

var FillChess = function (board, tiles, texture, key) {
    var scene = board.scene;
    var grid = board.grid;
    // Create mini board
    var miniBoard = scene.rexBoard.add.miniBoard(grid.x, grid.y, {
        grid: grid,
        draggable: true,
    });
    // Add chess
    for (var i = 0, cnt = tiles.length; i < cnt; i++) {
        var tileXY = tiles[i].rexChess.tileXYZ;
        var chess = scene.add.image(0, 0, texture, key);
        miniBoard.addChess(chess, tileXY.x, tileXY.y, 1);
    }
    // Set origin, put on main board
    miniBoard
        .setOrigin()
        .putOnMainBoard(board);

    // Add drag behavior
    miniBoard
        .on('dragstart', function (pointer, dragX, dragY) {
            this.pullOutFromMainBoard();
            this.setAlpha(0.3);
        }, miniBoard)
        .on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            if (this.isOverlapping(board)) {
                this.setAlpha(0.7);
                this.alignToMainBoard(board);
            } else {
                this.setAlpha(0.3);
            }
        }, miniBoard)
        .on('dragend', function (pointer, dragX, dragY) {
            this.putOnMainBoard(board);
            if (this.mainBoard) {
                this.setAlpha(1);
            }
        }, miniBoard);
    return miniBoard;
}

// Pick 4 connected tiles
var GetAGroup = function (board, candidates) {
    var scene = board.scene;
    var group = scene.plugins.get('rexUniqueItemList').add({ autoCleanup: false });
    var tile = candidates.getLast();
    var neighbors;
    for (var i = 0; i < 4; i++) {
        group.add(tile);
        candidates.remove(tile);
        neighbors = GetNeighborsGroup(board, tile, neighbors);
        neighbors.intersect(candidates, neighbors);
        if (neighbors.length > 0) {
            tile = neighbors.getRandom();
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
        out = scene.plugins.get('rexUniqueItemList').add({ autoCleanup: false });
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