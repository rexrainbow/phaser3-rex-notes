import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
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
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: 300,
            height: 400,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: undefined,
                cellHeight: 60,

                columns: 1,

                mask: {
                    padding: 2,
                    updateMode: 'everyTick'
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;

                if (item.removed) {
                    return null;
                }
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.sides({
                        rightSide: scene.rexUI.add.buttons({
                            width: 80,
                            orientation: 'x',
                            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_LIGHT),
                            buttons: [
                                scene.rexUI.add.label({
                                    text: scene.add.text(0, 0, 'Remove'),
                                })
                            ]
                        }),

                        panel: scene.rexUI.add.label({
                            orientation: 0,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_PRIMARY).setStrokeStyle(2, COLOR_DARK),
                            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                            text: scene.add.text(0, 0, ''),

                            space: {
                                icon: 10,
                                left: 15,
                            }
                        }).setDepth(1),

                        // Callbacks
                        showChildCallback: 'move-panel'
                    })
                    // console.log(cell.index + ': create new cell-container');
                } else {
                    // console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('panel.text').setText(item.id); // Set text of text object
                cellContainer.getElement('panel.icon').setFillStyle(item.color); // Set fill color of round rectangle object
                cellContainer.getElement('panel.background').setStrokeStyle(2, COLOR_DARK).setDepth(0);

                cellContainer
                    .setDirty(false)
                    .layout()
                    .reset()
                    .setDirty(true);
                return cellContainer;
            },
            items: getItems(100)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        this.print = this.add.text(0, 0, '');

        gridTable
            .on('cell.over', function (cellContainer, cellIndex) {
                cellContainer.getElement('panel.background').setStrokeStyle(2, COLOR_LIGHT);
                cellContainer.getElement('panel').setDepth(1.1);
            })
            .on('cell.out', function (cellContainer, cellIndex) {
                cellContainer.getElement('panel.background').setStrokeStyle(2, COLOR_DARK);
                cellContainer.getElement('panel').setDepth(1);
            })
            .on('cell.swipeleft', function (cellContainer, cellIndex) {
                cellContainer.showRightSide();
                if (gridTable.lastSideButton && (gridTable.lastSideButton !== cellContainer)) {
                    gridTable.lastSideButton.showPanel();
                }
                gridTable.lastSideButton = cellContainer;
                // Bug: task of showing right side & show panel by 'scroll' event
            })
            .on('cell.swiperight', function (cellContainer, cellIndex) {
                if (cellContainer === gridTable.lastSideButton) {
                    cellContainer.hideRightSide();
                    gridTable.lastSideButton = undefined;
                }
            })
            .on('scroll', function () {
                if (gridTable.lastSideButton) {
                    gridTable.lastSideButton.showPanel();
                    gridTable.lastSideButton = undefined;
                }
            })

        this.add.text(0, 580, 'Swipe-left cell to show side button')
    }

    update() { }
}

var getItems = function (count) {
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