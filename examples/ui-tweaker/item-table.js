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

    preload() { }

    create() {
        var gridTable = CreateGridTable(this)

        var editor = CreateEditor(this)
            .addRows([
                { $key: 'name', title: 'Name', view: 'string', },
                { $key: 'description', title: 'Descr-\niption', view: 'textarea', height: 100 },
                { $key: 'a', view: 'number' },
                { $key: 'b', view: 'number' },
                { $key: 'c', view: 'boolean' },
            ])

        var panel = this.rexUI.add.splitPanels({
            x: 400, y: 300,
            width: 700, height: 300,

            space: {
                item: 10
            },

            leftPanel: gridTable,
            rightPanel: editor,
            splitter: this.rexUI.add.roundRectangle(0, 0, 15, 1, 0, COLOR_DARK),

            minLeftPanelWidth: 200,
            minRightPanelWidth: 250,

            splitRatio: 0.5
        })
            .layout()

        var items = CreateItems(20);
        gridTable.setItems(items);

        gridTable.on('cell.up', function (cellContainer, cellIndex) {
            var item = gridTable.items[cellIndex];
            editor.setBindingTarget(item);
        }, this)

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
            a: 10,
            b: 20,
            c: false,
        })
    }
    return items;
}
var CreateGridTable = function (scene) {
    return scene.rexUI.add.gridTable({
        width: 300,

        scrollMode: 0,

        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, { bl: 10, tl: 10 }).setStrokeStyle(2, COLOR_LIGHT),

        table: {
            cellHeight: 40,

            columns: 1,

            mask: {
                padding: 1,
            },
            // enableLayer: true,

            reuseCellContainer: true,
        },

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 8, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        },

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 20,

            table: 10,
        },

        createCellContainerCallback: function (cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item,
                index = cell.index;
            if (cellContainer === null) {
                cellContainer = scene.rexUI.add.label({
                    width: width,
                    height: height,

                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                    text: scene.add.text(0, 0, '', { fontSize: FONT_SIZE }),

                    space: {
                        left: 5, right: 5, top: 5, bottom: 5
                    }
                });
            }

            // Set properties from item value
            cellContainer.setMinSize(width, height); // Size might changed in this demo
            cellContainer.getElement('text').setText(item.name); // Set text of text object
            cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
            return cellContainer;
        },
    })
}

var CreateEditor = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 300,

        styles: {
            space: { left: 10, right: 10, top: 10, bottom: 10, item: 3 },

            background: {
                radius: { br: 10, tr: 10 },
                color: 0x0,
                strokeColor: COLOR_LIGHT,
            },

            inputRow: {
                height: 26,
                space: { left: 5, right: 5, top: 2, bottom: 2 },

                title: {
                    space: { icon: 2 },
                    iconSize: 30,
                    text: { fontSize: FONT_SIZE },
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
                        backgroundHeight: FONT_SIZE,
                        fontSize: FONT_SIZE,
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
                        color: COLOR_MAIN,
                        height: 8,
                    },
                    thumb: {
                        color: COLOR_LIGHT,
                        width: 16, height: 16,
                    },
                },

                list: {
                    label: {
                        space: { left: 5, right: 5 },
                        background: {
                            color: COLOR_DARK,
                        },
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
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },
                    text: {
                        fontSize: FONT_SIZE
                    }
                },

                checkbox: {
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
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
                                backgroundHeight: FONT_SIZE,
                                fontSize: FONT_SIZE,
                            },
                            cursorStyle: {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }
                    }
                },

                proportion: {
                    title: 1,
                    inputField: 1.5,
                    range: { slider: 2, inputText: 1 }
                }
            },

            folder: {
                space: { left: 10 },

                title: {
                    space: { left: 5, top: 2, bottom: 2 },
                    text: { fontSize: FONT_SIZE },
                    iconSize: 30,
                    background: { color: COLOR_DARK },

                    expandedIcon: {
                        color: COLOR_MAIN,
                    },
                },

                background: {
                    strokeColor: COLOR_DARK
                },

            },

            tab: {
                tab: {
                    space: { left: 3, right: 3, top: 3, bottom: 3 },

                    text: { fontSize: FONT_SIZE },
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_MAIN,
                        'active.color': COLOR_MAIN,
                    },

                },
                tabs: {
                    space: { item: 3 }
                },
                pages: {
                    fadeIn: 300
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