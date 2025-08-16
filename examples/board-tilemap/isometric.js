import phaser from '../../../phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('tileset', 'assets/tilemaps/isometric/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/isometric/map.json');
    }

    create() {
        var map = this.add.tilemap('map');
        map.tilesets.forEach(function (tileset) {
            map.addTilesetImage(tileset.name, tileset.name)
        });
        map.layers.forEach(function (layer) {
            map.createLayer(layer.name, map.tilesets)
        });

        this.cameras.main.centerOn(0, 200).setZoom(2)

        var board = this.rexBoard.createBoardFromTilemap(map);

        // This red square should be over the rock, which is at 10,9.
        var chess = this.rexBoard.add.shape(board, 10, 9, 1, 0xff0000, 0.5);
        // chess.x += 16; // 32/2
        // chess.y += 24; // 16 + 16/2

        var worldXY0 = board.tileXYToWorldXY(10, 9);
        console.log(worldXY0)

        var worldXY1 = map.tileToWorldXY(10, 9);
        console.log(worldXY1)

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