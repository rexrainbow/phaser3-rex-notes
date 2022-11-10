import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import ColorInput from '../../templates/ui/colorinput/colorinput/ColorInput.js';

const COLOR_PRIMARY = 0x424242;
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
        var ui = this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 200, height: 140,
            orientation: 'y'
        })
            .add(
                CreateColorInput(this),
                { proportion: 1, expand: true }
            )
            .add(
                CreateColorInput(this),
                { proportion: 1, expand: true }
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
    }

    update() { }
}

var CreateColorInput = function (scene) {
    return new ColorInput(scene, {
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 }
    })
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