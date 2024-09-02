import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var scrollMode = 0; // 0:vertical, 1:horizontal
        var tableWidth = (scrollMode === 0) ? 350 : 450;
        var tableHeight = (scrollMode === 0) ? 450 : 350;
        var cellSize = 140;
        var columns = (scrollMode === 0) ? Math.floor(tableWidth / cellSize) : Math.floor(tableHeight / cellSize);

        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: tableWidth,
            height: tableHeight,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle({ color: COLOR_MAIN, radius: 10 }),

            table: {
                cellWidth: cellSize,
                cellHeight: cellSize,

                columns: columns,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ color: COLOR_DARK, width: 20, height: 10, radius: 10 }),
                thumb: this.rexUI.add.roundRectangle({ color: COLOR_LIGHT, radius: 13 }),
            },

            mouseWheelScroller: {
                focus: true,
                speed: 0.1
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
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

                        orientation: 'y',

                        space: {
                            top: 10, bottom: 10, left: 10, right: 10,
                            icon: 20, text: 20
                        },

                        background: scene.rexUI.add.roundRectangle({ strokeColor: COLOR_DARK, strokeWidth: 2 }),

                        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),

                        text: scene.add.text(0, 0, ''),

                        action: scene.rexUI.add.label({
                            space: {
                                top: 10, bottom: 10, left: 10, right: 10,
                                icon: 10, text: 10
                            },

                            background: scene.rexUI.add.roundRectangle({ color: COLOR_DARK, radius: 10 }),

                            text: scene.add.text(0, 0, '1000'),
                        }),

                    });
                }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('text').setText(item.id); // Set text of text object
                cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                return cellContainer;
            },
            items: CreateItems(100)
        })
            .layout()


        var print = this.add.text(0, 0, '');
        gridTable
            .on('cell.click', function (cellContainer, cellIndex, pointer, event) {
                // console.log(`click cell ${cellIndex}`);

                if (cellContainer.isPointerInBounds('icon')) {
                    print.text += `click icon ${cellIndex}\n`;
                } else if (cellContainer.isPointerInBounds('action')) {
                    print.text += `click action ${cellIndex}\n`;
                }
            });

    }

    update() { }
}

var CreateItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
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