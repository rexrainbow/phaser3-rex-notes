import phaser from 'phaser/src/phaser.js';
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

        this.rexUI.modalPromise(
            // Game object
            CreateGridTable(this).layout().setPosition(400, 300),
            // Config
            {
                manaulClose: true,
                duration: {
                    in: 500,
                    out: 500
                }
            }
        )

    }

    update() { }
}

var CreateGridTable = function (scene) {
    var scrollMode = 0; // 0:vertical, 1:horizontal
    var gridTable = scene.rexUI.add.gridTable({
        width: (scrollMode === 0) ? 300 : 420,
        height: (scrollMode === 0) ? 420 : 300,

        scrollMode: scrollMode,

        background: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

        table: {
            cellWidth: (scrollMode === 0) ? undefined : 60,
            cellHeight: (scrollMode === 0) ? 60 : undefined,

            columns: 2,

            mask: {
                padding: 2,
            },

            reuseCellContainer: true,
        },

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

        footer: CreateFooterButton(scene, 'Close', scrollMode),

        // mouseWheelScroller: {
        //     focus: false,
        //     speed: 0.1
        // },

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,

            table: 10,
            footer: 10,
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

                    orientation: scrollMode,
                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                    icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                    text: scene.add.text(0, 0, ''),

                    space: {
                        icon: 10,
                        left: (scrollMode === 0) ? 15 : 0,
                        top: (scrollMode === 0) ? 0 : 15,
                    }
                });
            }

            // Set properties from item value
            cellContainer.setMinSize(width, height); // Size might changed in this demo
            cellContainer.getElement('text').setText(item.id); // Set text of text object
            cellContainer.getElement('icon').setFillStyle(0x888888); // Set fill color of round rectangle object
            cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
            return cellContainer;
        },
        items: CreateItems(100)
    })
        .on('cell.click', function (cellContainer, cellIndex, pointer, event) {
            cellContainer.getElement('icon').setFillStyle(Random(0, 0xffffff));
        })

    gridTable.getElement('footer').onClick(function () {
        gridTable.emit('modal.requestClose');
    })

    return gridTable;
}

var CreateFooterButton = function (scene, text, orientation) {
    return scene.rexUI.add.label({
        height: (orientation === 0) ? 40 : undefined,
        width: (orientation === 0) ? undefined : 40,
        orientation: orientation,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
        text: scene.add.text(0, 0, text),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        align: 'center',
        space: {
            icon: 10
        }
    })
}


var CreateItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            // color: Random(0, 0xffffff)
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