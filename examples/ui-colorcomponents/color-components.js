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
        var rect = this.add.rectangle(0, 0, 100, 100).setOrigin(0);

        var ui = this.rexUI.add.colorComponents({
            x: 400, y: 300,
            width: 200, height: 40,

            list: {
                label: {
                    width: 48,
                    background: {
                        color: COLOR_DARK,
                    },
                    space: { left: 5, right: 5 }
                },
                button: {
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,

                        'active.color': COLOR_LIGHT,
                    },
                    space: { left: 5, right: 5, top: 5, bottom: 5 }
                },
            },

            inputText: {
                padding: { left: 5, right: 5 },
                background: {
                    color: COLOR_DARK,
                    stroke: COLOR_PRIMARY,
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
            },

            space: {
                item: 5
            },

            valuechangeCallback(value) {
                rect.setFillStyle(value);
            },
            value: Phaser.Math.Between(0, 0x1000000)
        })

        ui
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