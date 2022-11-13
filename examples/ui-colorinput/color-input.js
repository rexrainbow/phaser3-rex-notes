import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        this.load.image('img', './assets/images/flash-on.png');
    }

    create() {
        var ui = this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 240,
            orientation: 'y'
        })
            .addBackground(
                this.rexUI.add.roundRectangle({ strokeColor: COLOR_LIGHT })
            )
            .add(
                CreateColorInput0(this),
                { proportion: 1, expand: true }
            )
            .add(
                CreateColorInput1(this),
                { proportion: 1, expand: true }
            )
            .add(
                CreateColorInput2(this),
                { proportion: 1, expand: true }
            )
            .add(
                CreateColorInput3(this),
                { proportion: 1, expand: true }
            )
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
    }

    update() { }
}

const InputTextConfig = {
    background: {
        color: COLOR_DARK
    },
    focusStyle: {
        color: COLOR_PRIMARY,
    },
    style: {
        backgroundBottomY: 4,
        backgroundHeight: 18,
    },
    cursorStyle: {
        color: 'black',
        backgroundColor: 'white',
    }
}

var CreateColorInput0 = function (scene) {
    return scene.rexUI.add.colorInput({
        height: 60,
        inputText: InputTextConfig,
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 },

        value: Phaser.Math.Between(0, 0x1000000)
    })
}

var CreateColorInput1 = function (scene) {
    return scene.rexUI.add.colorInput({
        height: 60,
        swatch: {
            shape: 'circle'
        },
        inputText: InputTextConfig,
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 },

        value: Phaser.Math.Between(0, 0x1000000)
    })
}

var CreateColorInput2 = function (scene) {
    return scene.rexUI.add.colorInput({
        height: 60,
        swatch: {
            radius: 12,
        },
        inputText: InputTextConfig,
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 },

        value: Phaser.Math.Between(0, 0x1000000)
    })
}

var CreateColorInput3 = function (scene) {
    return scene.rexUI.add.colorInput({
        height: 60,
        swatch: scene.add.image(0, 0, 'img'),
        inputText: InputTextConfig,
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 },

        value: Phaser.Math.Between(0, 0x1000000)
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