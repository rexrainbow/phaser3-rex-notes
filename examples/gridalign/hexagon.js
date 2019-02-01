import GridAlignPlugin from '../../plugins/gridalign-plugin.js';
import HexagonPlugin from '../../plugins/hexagon-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var staggeraxis = 'x';
        var staggerindex = 'odd';
        var key = 'shape';
        createHexagonTexture(this, key, staggeraxis, staggerindex);

        var items = [];
        for (var i = 0; i < 16; i++) {
            items.push(
                this.add.image(0, 0, key)
                .setTint(Random(0, 0xffffff))
            );
        }

        var image = items[0];
        this.plugins.get('rexGridAlign').hexagon(items, {
            width: 4,
            height: 4,
            cellWidth: image.width,
            cellHeight: image.height,
            staggeraxis: staggeraxis,
            staggerindex: staggerindex,
            x: 50,
            y: 50
        });
    }

    update() {}
}

var createHexagonTexture = function (scene, key, staggeraxis) {
    var hexagon = new Phaser.Geom.rexHexagon(0, 0, 30, staggeraxis);
    hexagon.left = 0;
    hexagon.top = 0;

    var points = hexagon.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(hexagon.width), Math.floor(hexagon.height))
        .destroy();
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
                key: 'rexGridAlign',
                plugin: GridAlignPlugin,
                start: true
            },
            {
                key: 'rexHexagon',
                plugin: HexagonPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);