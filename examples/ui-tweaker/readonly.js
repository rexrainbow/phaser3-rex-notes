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
        this.load.image('settings', 'assets/images/settings.png');
        this.load.image('arrow-down', 'assets/images/arrow-down.png');
        this.load.image('add', 'assets/images/add.png');
        this.load.image('delete', 'assets/images/delete.png');
        this.load.image('delete2', 'assets/images/delete2.png');

    }

    create() {
        var gameObject = this.add.circle(400, 300, 20, 0xff0000).setStrokeStyle(4, 0xffffff)
            .setName('abc');

        gameObject.description = 'A Circle Game object';
        gameObject.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        var panel = CreatePanel(this)
            .setPosition(0, 0)
            .setOrigin(0)
            .layout();

        panel
            .addFolder({
                title: 'Position',
                expanded: false
            })
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

        panel
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
            .addSeparator()

        var pages = panel
            .addTab({
                pages: [
                    { title: 'Display' },
                    { title: 'Color' },
                    { title: 'Description' },
                    { title: 'Items' },
                ]
            })

        pages[0]
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
                    // view: 'toggleSwitch'        // Toggle-switch
                }
            )

        pages[1]
            .addButton({
                title: 'New-\ncolor',
                icon: 'settings',             // Title icon

                label: 'Random',
                callback: function () {
                    var fillColor = Phaser.Math.Between(0, 0x1000000);
                    gameObject.fillColor = fillColor;
                    gameObject.strokeColor = 0x1000000 - fillColor;
                }
            })
            .addInput(
                gameObject, 'fillColor',
                {
                    title: 'color',             // Custom title
                    icon: 'settings',           // Title icon
                    view: 'color',
                    monitor: true,
                }
            )
            .addInput(
                gameObject, 'strokeColor',
                {
                    title: 'stroke',            // Custom title
                    icon: 'settings',           // Title icon
                    view: 'color',
                    monitor: true,
                }
            )
            .addInput(
                gameObject, 'lineWidth',
                {
                    title: 'stroke-\nwidth',    // Custom title
                    icon: 'settings',           // Title icon
                    view: 'incdec',
                    min: 0, max: 10
                }
            )

        pages[2]
            .addInput(
                gameObject, 'description',
                {
                    icon: 'settings',           // Title icon
                    view: 'textarea',
                    orientation: 'y',           // Set layout to vertical
                }
            )

        pages[3]
            .addInput(
                gameObject, 'items',
                {
                    icon: 'settings',           // Title icon
                }
            )

        panel
            .addSeparator()
            .addInput(
                gameObject, 'name',
                {
                    icon: 'settings',           // Title icon
                }
            )

        panel
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        panel.setReadOnly(true);
    }

    update() {
    }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 340,

        styles: {
            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                border: {
                    strokeColor: COLOR_MAIN
                },

                title: {
                    space: { icon: 2, top: 5, bottom: 5 },
                    iconSize: 24,
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
                    height: 100,
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

            arrayTable: {
                height: 200,

                space: {
                    left: 10, right: 10, top: 10, bottom: 10,
                    table: 10, splitter: 5,
                    cell: {
                        top: 5, bottom: 5, left: 5,
                        index: 10, tweaker: 5,
                    },
                    header: 5, footer: 5,
                },

                background: {
                    strokeColor: COLOR_MAIN,
                },

                slider: {
                    track: {
                        color: COLOR_DARK,
                        width: 8, height: 8,
                    },
                    thumb: {
                        color: COLOR_LIGHT,
                        width: 16, height: 16,
                    },
                },

                splitter: {
                    width: 10,
                    height: 10,
                    color: COLOR_MAIN,
                    alpha: 1
                },

                cellBackground: {
                    coloe: null,
                    strokeWidth: 0,
                    'active.color': COLOR_LIGHT,
                    'active.alpha': 0.5,
                    'hover.strokeColor': 0xffffff,
                    'hover.strokeWidth': 2,
                },

                index: {
                    width: 25,
                },

                deleteButton: {
                    icon: { key: 'delete', },
                    iconSize: 20,
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                    },

                },

                moveUpButton: {
                    //space: { left: 5, right: 5, top: 5, bottom: 5 },
                    icon: { key: 'arrow-down', flipY: true },
                    iconSize: 16,
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                    },

                },

                moveDownButton: {
                    //space: { left: 5, right: 5, top: 5, bottom: 5 },
                    icon: { key: 'arrow-down' },
                    iconSize: 16,
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                    },

                },

                addButton: {
                    space: { left: 5, right: 5, top: 5, bottom: 5 },
                    icon: { key: 'add', },
                    iconSize: 20,
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                    },

                },

                clearButton: {
                    space: { left: 5, right: 5, top: 5, bottom: 5 },
                    icon: { key: 'delete2', },
                    iconSize: 20,
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                    },

                },

            },

            separator: {
                height: 5,
                color: COLOR_DARK
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