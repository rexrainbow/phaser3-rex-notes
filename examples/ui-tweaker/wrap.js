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
        this.load.image('arrow-down', 'assets/images/arrow-down.png');
    }

    create() {
        var gameObject = this.add.circle(400, 300, 20, 0xff0000).setStrokeStyle(4, 0xffffff)

        gameObject.description = 'A Circle Game object';

        var properties = [
            {
                $type: 'wrap',
                itemWidth: 235,
                $properties: [
                    {
                        $key: 'x',
                        min: 0, max: 800,
                        format: function (value) {
                            return value.toFixed(2);
                        }
                    },
                    {
                        $key: 'y',
                        options: [
                            { text: 'top', value: 0 },
                            { text: 'center', value: 300 },
                            { text: 'bottom', value: 600 },
                        ]
                    },
                    {
                        $key: 'radius',
                        title: 'size',
                        options: [
                            { text: 'L', value: 40 },
                            { text: 'M', value: 20 },
                            { text: 'S', value: 10 },
                        ],
                        view: 'buttons'
                    },
                    { $key: 'fillColor', title: 'color', view: 'color', monitor: true },
                    { $key: 'strokeColor', title: 'stroke', view: 'color', monitor: true },
                    { $key: 'lineWidth', title: 'stroke-\nwidth', view: 'incdec', min: 0, max: 10 }
                ]
            },
            { $key: 'description', view: 'textarea', orientation: 'y' },
        ]

        CreatePanel(this)
            .addRows(properties, gameObject, false)
            .setOrigin(0.5, 0)
            .setPosition(400, 0)
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

    }

    update() {
    }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 500,

        styles: {
            space: {
                left: 10, right: 10, top: 10, bottom: 10, item: 5
            },

            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                background: {
                    strokeColor: COLOR_MAIN
                },

                title: {
                    space: { icon: 2 },
                    height: 30,
                },

                inputText: {
                    background: {
                        color: COLOR_DARK
                    },
                    focusStyle: {
                        color: COLOR_MAIN,
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

                inputTextArea: {
                    height: 60,
                },

                slider: {
                    track: {
                        color: COLOR_DARK,
                        width: 8, height: 8,
                    },
                    indicator: {
                        color: COLOR_MAIN,
                        width: 8, height: 8,
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
                        space: { left: 5, right: 5, top: 8, bottom: 8 },
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,

                            'hover.color': COLOR_LIGHT,
                        },

                    },
                },

                button: {
                    space: { left: 8, right: 8, top: 8, bottom: 8 },
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },

                },

                checkbox: {
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
                },

                toggleSwitch: {
                    color: COLOR_LIGHT,
                    falseValueTrackColor: COLOR_MAIN,
                },

                colorInput: {
                    colorPicker: {
                        background: { color: 0x0, strokeColor: COLOR_LIGHT },
                    },

                    colorComponents: {
                        inputText: {
                            background: {
                                color: COLOR_DARK
                            },
                            focusStyle: {
                                color: COLOR_MAIN,
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
                    }
                },

                incDec: {
                    incButton: {
                        space: { left: 5, right: 5 },
                        icon: { key: 'arrow-down', flipY: true },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },

                    },
                    decButton: {
                        space: { left: 5, right: 5 },
                        icon: { key: 'arrow-down' },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },

                    },
                },

            },

            folder: {
                title: {
                    iconSize: 30,
                    background: { color: COLOR_DARK },
                    space: { icon: 2 },

                    expandedIcon: {
                        color: COLOR_MAIN,
                    },
                },

                background: {
                    strokeColor: COLOR_DARK
                },

                space: {
                    left: 10, right: 0, top: 5, bottom: 5, item: 3
                },
            },

            tab: {
                tab: {
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_MAIN,
                        'active.color': COLOR_MAIN,
                    },
                    space: { left: 3, right: 3, top: 3, bottom: 3 }
                },
                tabs: {
                    space: { item: 3 }
                },
                pages: {
                    fadeIn: 300
                },
            },

            columns: {
                space: { column: 5 },
            },

            wrapLines: {
                space: { line: 10 }
            },

            separator: {
                height: 5,
                color: COLOR_DARK
            },
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
