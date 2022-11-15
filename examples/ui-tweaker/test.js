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
        this.load.image('settings', 'assets/images/settings.png');
    }

    create() {
        var gameObject = this.add.circle(400, 300, 20, 0xff0000)
            .setName('abc');

        var panel = CreatePanel(this)
            .setPosition(0, 0)
            .setOrigin(0)
            .layout();

        panel
            .addInput(
                gameObject, 'x',
                {
                    icon: 'settings',           // Title icon
                    min: 0, max: 800,           // Range
                    format(value) {             // Formatter of text
                        return value.toFixed(2);
                    },
                    // inputTextReadOnly: true  // Uneditable
                }
            )
            .addInput(
                gameObject, 'y',
                {
                    icon: 'settings',           // Title icon
                    options: [                  // List options
                        { text: 'top', value: 0 },
                        { text: 'center', value: 300 },
                        { text: 'bottom', value: 600 },
                    ]
                    // Default list is dropdown-list
                }
            )
            .addInput(
                gameObject, 'radius',
                {
                    icon: 'settings',           // Title icon
                    title: 'size',              // Custom title
                    options: [                  // List options
                        { text: 'L', value: 40 },
                        { text: 'M', value: 20 },
                        { text: 'S', value: 10 },
                    ],
                    view: 'buttons'             // Buttons list
                }
            )
            .addInput(
                gameObject, 'alpha',
                {
                    icon: 'settings',           // Title icon
                }
            )
            .addInput(
                gameObject, 'visible',
                {
                    icon: 'settings',           // Title icon
                }
            )
            .addInput(
                gameObject, 'name',
                {
                    icon: 'settings',           // Title icon
                }
            )
            .layout();

    }

    update() {
    }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 300,

        styles: {
            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0x888888
            },

            inputRow: {
                background: {
                    strokeColor: COLOR_LIGHT
                },

                title: {
                    iconSize: 30,
                    space: { icon: 2 }
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
                        size: 16,
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
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
                },

                proportion: {
                    title: 1,
                    inputField: 1.5,
                    range: { slider: 2, inputText: 1 }
                }
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10
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