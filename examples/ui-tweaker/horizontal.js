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
                    onValueChange(value, oldeValue, target, key) {
                        console.log(`${key}=${value}`)
                    },
                }
            )
            .addInput(
                gameObject, 'y',
                {
                    min: 0, max: 600,           // Range
                    format(value) {             // Formatter of text
                        return value.toFixed(2);
                    },
                    onValidate(newValue) { return (newValue < 400) },
                    onValueChange(value, oldeValue, target, key) {
                        console.log(`${key}=${value}`)
                    },
                }
            )
            .addInput(
                gameObject, 'fillColor',
                {
                    title: 'color',             // Custom title
                    view: 'color',
                    onValidate(newValue) {
                        var r = (newValue >> 16) & 0xff;
                        var g = (newValue >> 8) & 0xff;
                        var b = (newValue >> 0) & 0xff;
                        return ((r + g + b) / 3) < 128;
                    }
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
            background: {
                radius: 10,
                color: 0x0,
                strokeColor: COLOR_LIGHT,
            },

            inputRow: {
                background: {
                    strokeColor: COLOR_PRIMARY
                },

                title: {
                    space: { right: 5 }
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
                    width: 80,
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
                    swatch: {
                        radius: 10, size: 30
                    },

                    inputText: false,

                    colorPicker: {
                        background: { color: 0x0, strokeColor: COLOR_LIGHT },
                    },

                    colorComponents: false
                },

                space: {
                    left: 10, right: 10
                }
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10, item: 5
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