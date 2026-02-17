import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x424242;
const COLOR_LIGHT = 0x6d6d6d;
const COLOR_DARK = 0x1b1b1b;
const FONT_SIZE = 16;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('add', 'assets/images/add.png');
        this.load.image('delete', 'assets/images/delete.png');
        this.load.image('delete2', 'assets/images/delete2.png');
        this.load.image('arrow-down', 'assets/images/arrow-down.png');
    }

    create() {
        var target = CreateItems(10)
        var panel = CreatePanel(this)
            .setPosition(0, 0)
            .setOrigin(0)
            .addArrayTable(target, null, {
                $properties: [
                    { $key: 'name' },
                    { $key: 'a' },
                    { $key: 'b' },
                ],

                createDefaultItem() {
                    return CreateItems(1)[0]
                },

                inputRowProportion: 1,
            })
            .layout();

    }

    update() {
    }
}

var CreateItems = function (amount) {
    var items = [];
    for (var i = 0; i < amount; i++) {
        items.push({
            name: `Item ${i}`,
            description: `Item ${i}`,
            a: 10 + i,
            b: 20 + i,
            c: false,
        })
    }
    return items;
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 340,

        styles: {
            space: {
                left: 10, right: 10, top: 10, bottom: 10, item: 3
            },

            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                space: { top: 5, bottom: 5 },
                proportion: {
                    title: 1,
                    inputField: 3,
                    range: { slider: 2, inputText: 1 }
                },

                background: {
                    strokeColor: COLOR_MAIN
                },

                title: {
                    space: { icon: 2 },
                    iconSize: 30,
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
                height: 260,

                space: {
                    left: 10, right: 10, top: 10, bottom: 10,
                    table: 10,
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
                    iconSize: 24,
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