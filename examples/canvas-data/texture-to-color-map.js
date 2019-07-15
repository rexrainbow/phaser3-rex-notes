import CanvasDataPlugin from '../../plugins/canvasdata-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        this.add.image(0, 0, 'mushroom').setOrigin(0);
        this.plugins.get('rexCanvasData').textureTColorMap('mushroom')
            .forEach(function (value, x, y, bitmap) {
                var color = value & 0xffffff;
                var alpha = value >> 24;
                this.add.rectangle(
                    100 + (x * 4),
                    100 + (y * 4),
                    4,
                    4,
                    color,
                    (alpha / 255)
                )
            }, this)
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
        global: [{
            key: 'rexCanvasData',
            plugin: CanvasDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);