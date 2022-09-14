import phaser from '../../../rex-phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('road', 'assets/images/road/road.png');
    }

    create() {
        var map = this.make.tilemap(
            {
                data: [
                    [15, 15],
                    [15, 15],
                ],
                tileWidth: 100,
                tileHeight: 65,
                orientation: Phaser.Tilemaps.ISOMETRIC
            }
        );

        var tiles = map.addTilesetImage('road');
        var layer = map.createLayer(0, tiles, 100, 100);
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