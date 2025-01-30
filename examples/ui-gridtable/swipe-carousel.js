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
        var cellWidth = 300;
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,

            scrollMode: 1,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_MAIN),

            table: {
                width: cellWidth,
                height: 100,
                cellWidth: cellWidth,

                mask: {
                    padding: 2,
                },
                // enableLayer: true,

                reuseCellContainer: true,
            },

            snapStep: cellWidth,

            scroller: {
                // pointerOutRelease: false,
                slidingDeceleration : 30000
            },

            mouseWheelScroller: {
                focus: false,
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
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

                        orientation: 0,
                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0),
                        text: scene.add.text(0, 0, '', { fontSize: 30 }),

                        align: 'center',
                    });
                }

                // Set properties from item value
                cellContainer.setMinSize(width - 10, height); // Size might changed in this demo
                cellContainer.getElement('text').setText(item.id); // Set text of text object
                cellContainer.getElement('background').setFillStyle(item.color);
                return cellContainer;
            },
            items: CreateItems(20)
        })
            .layout()
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