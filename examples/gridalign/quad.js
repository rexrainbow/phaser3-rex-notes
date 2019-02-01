import GridAlignPlugin from '../../plugins/gridalign-plugin.js';
import RhombusPlugin from '../../plugins/rhombus-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var key = 'shape';
        createRhombusTexture(this, key);

        var items = [];
        for (var i = 0; i < 16; i++) {
            items.push(
                this.add.image(0, 0, key)
                .setTint(Random(0, 0xffffff))
            );
        }

        var image = items[0];
        this.plugins.get('rexGridAlign').quad(items, {
            width: 4,
            height: 4,
            cellWidth: image.width,
            cellHeight: image.height,
            type: 'isometric',
            x: 400,
            y: 50
        });
    }

    update() {}
}

var createRhombusTexture = function (scene, key) {
    var rhombus = new Phaser.Geom.rexRhombus(0, 0, 80, 40);

    var points = rhombus.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(rhombus.width), Math.floor(rhombus.height))
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
                key: 'rexRhombus',
                plugin: RhombusPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);