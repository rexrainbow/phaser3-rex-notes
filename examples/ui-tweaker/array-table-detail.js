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
        this.load.image('copy', 'assets/images/copy.png');
        this.load.image('reset', 'assets/images/reset.png');
    }

    create() {
        var isVerticalView = true;
        var panel = CreatePanel(this, isVerticalView)
            .setPosition(0, 0)
            .setOrigin(0)
            .addArrayTable(CreateComplexItems(10), null, {
                view: (isVerticalView) ? 'detail-V' : 'detail-H',
                $properties: [
                    { $key: 'name', title: 'Name', view: 'string', },
                    { $key: 'description', title: 'Descr-\niption', view: 'textarea', height: 100 },
                    { $key: 'a', view: 'number' },
                    { $key: 'b', view: 'number' },
                    { $key: 'c', view: 'boolean' },
                    { $key: 'd', view: 'number' },
                    { $key: 'e', view: 'number' },
                    { $key: 'f', view: 'number' },
                    { $key: 'g', view: 'number' },
                    { $key: 'h', view: 'number' },
                ],

                createDefaultItem() {
                    return CreateComplexItems(1)[0]
                },

                displayNameLabel(index, item, items) {
                    return {
                        text: item.name
                    }
                },

                splitRatio: (isVerticalView) ? 0.5 : 0.4
            })
            .layout()

    }

    update() {
    }
}

var CreateComplexItems = function (amount) {
    var items = [];
    for (var i = 0; i < amount; i++) {
        items.push({
            name: `Item ${i}`,
            description: `Item ${i}`,
            a: 10 + i,
            b: 20 + i,
            c: false,
            d: 30 + i,
            e: 40 + i,
            f: 50 + i,
            g: 60 + i,
            h: 70 + i,
        })
    }
    return items;
}

var CreatePanel = function (scene, isVerticalView) {
    return scene.rexUI.add.tweaker({
        width: (isVerticalView) ? 400 : 600,

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
                    text: { padding: { top: 5 } }
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
                height: (isVerticalView) ? 500 : 300,

                space: {
                    left: 10, right: 10, top: 10, bottom: 10,
                    table: 10, splitter: 8,
                    cell: {
                        top: 5, bottom: 5, left: 5,
                        index: 10, tweaker: 5,
                    },
                    header: 10, footer: 10,
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
                    'active.alpha': 0.3,
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

                editorToolbar: {
                    // title, header
                    // index: {},
                    // displayName: {},

                    // toolbar, footer
                    deleteButton: {
                        space: { left: 5, right: 5, top: 5, bottom: 5 },
                        icon: { key: 'delete', },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },

                    },
                    duplicateButton: {
                        space: { left: 5, right: 5, top: 5, bottom: 5 },
                        icon: { key: 'copy', },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },

                    },
                    resetButton: {
                        space: { left: 5, right: 5, top: 5, bottom: 5 },
                        icon: { key: 'reset', },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },

                    },
                    previousButton: {
                        space: { left: 5, right: 5, top: 5, bottom: 5 },
                        icon: { key: 'arrow-down', flipY: true },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },
                    },
                    nextButton: {
                        space: { left: 5, right: 5, top: 5, bottom: 5 },
                        icon: { key: 'arrow-down' },
                        iconSize: 20,
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,
                        },
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