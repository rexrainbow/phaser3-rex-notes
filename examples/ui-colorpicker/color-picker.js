import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x424242;
const COLOR_LIGHT = 0x6d6d6d;
const COLOR_DARK = 0x1b1b1b;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var rect = this.add.rectangle(0, 0, 100, 100).setOrigin(0);

        var colorPicker = this.rexUI.add.colorPicker({
            x: 400, y: 300,

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_MAIN),

            svPalette: {
                width: 128,
                height: 128
            },
            hPalette: {
                // position: 'right',
                size: 16
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 10,
            },

            valuechangeCallback(value) {
                rect.setFillStyle(value);
            },
            value: Phaser.Math.Between(0, 0x1000000)
        })
            .layout()
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
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);