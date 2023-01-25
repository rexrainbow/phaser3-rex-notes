import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('tiles', 'assets/tilemaps/orthogonal/tmw_desert_spacing.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/orthogonal/desert.json');
    }

    create() {
        var map = this.add.tilemap('map');
        var tiles = map.addTilesetImage('Desert', 'tiles');
        var layer = map.createLayer('Ground', tiles);

        var board = this.rexBoard.createBoardFromTilemap(map);
        var chess = this.rexBoard.add.shape(board, 0, 0, 1, 0xff0000, 0.5).setOrigin(0);

        var moveTo = this.rexBoard.add.moveTo(chess, {
            moveableTest: function (fromTileXYZ, toTileXYZ, direction, board) {
                var tile = board.tileXYZToChess(toTileXYZ.x, toTileXYZ.y, 'Ground');
                return tile.index === 30;
            }
        });
        moveTo.on('complete', function () {
            moveTo.moveToRandomNeighbor();
        })
        moveTo.moveToRandomNeighbor();
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