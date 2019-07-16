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
    }

    create() {
        var txt = this.add.text(0, 0, 'hello');
        this.plugins.get('rexCanvasData').textObjectToBitMap(txt)
            .forEach(function (value, x, y, bitMap) {
                this.add.rectangle(
                    30 + (x * 4),
                    30 + (y * 4),
                    4,
                    4,
                    ((value) ? COLOR_LIGHT : COLOR_DARK)
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