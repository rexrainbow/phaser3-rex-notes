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
    }

    create() {
        var gameObject = this.add.circle(400, 300, 20, 0xff0000).setStrokeStyle(4, 0xffffff)
            .setName('abc');

        var panel = CreatePanel(this)
            .setPosition(400, 500)
            .layout();

        panel
            .addInput(
                gameObject, 'x',
                {
                    min: 0, max: 800,           // Range
                    format(value) {             // Formatter of text
                        return value.toFixed(2);
                    },
                    onValueChange(value) { console.log(`x=${value}`) }
                }
            )
            .addInput(
                gameObject, 'y',
                {
                    min: 0, max: 600,           // Range
                    format(value) {             // Formatter of text
                        return value.toFixed(2);
                    },
                    onValueChange(value) { console.log(`y=${value}`) }
                }
            )
            .addInput(
                gameObject, 'fillColor',
                {
                    title: 'color',             // Custom title
                    view: 'color',
                }
            )
            .addInput(
                gameObject, 'visible',
                {
                    // view: 'toggleSwitch'        // Toggle-switch
                }
            )
            .layout();

    }

    update() {
    }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        orientation: 0,
        height: 60,

        styles: {
            // itemWidth: 200,

            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                background: {
                    strokeColor: COLOR_PRIMARY
                },

                title: {
                    iconSize: 30,
                    space: { left: 5, right: 5 }
                },

                inputText: {
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
                },

                slider: {
                    width: 100,
                    track: {
                        color: COLOR_DARK,
                        height: 8,
                    },
                    indicator: {
                        color: COLOR_PRIMARY,
                        height: 8,
                    },
                    thumb: {
                        color: COLOR_LIGHT,
                        width: 16, height: 16,
                    },
                },

                list: {
                    label: {
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
                        space: { left: 5, right: 5, top: 8, bottom: 8 }
                    },
                },

                button: {
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },
                    space: { left: 8, right: 8, top: 8, bottom: 8 }
                },

                checkbox: {
                    size: 30,
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
                },

                toggleSwitch: {
                    color: COLOR_LIGHT,
                    falseValueTrackColor: COLOR_PRIMARY,
                },

                colorInput: {
                    swatchSize: 30,

                    inputText: false,

                    colorPicker: {
                        background: { color: 0x0, strokeColor: COLOR_LIGHT },
                    },

                    colorComponents: false
                },

                proportion: {
                    title: 0,
                    inputField: 0,
                    range: { slider: 0, inputText: 0 }
                }
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10, item: 3
            }
        },
    })
}

var config = {
    type: Phaser.AUTO,
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