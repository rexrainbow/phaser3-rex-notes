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
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: 300,
            height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle({ radius: 10, color: COLOR_PRIMARY }),

            table: {
                cellWidth: undefined,
                cellHeight: 60,

                columns: 1,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 10, radius: 10, color: COLOR_DARK }),
                thumb: this.rexUI.add.roundRectangle({ radius: 13, color: COLOR_LIGHT }),
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
                    items = cell.items,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.sizer({ orientation: 'y' });

                    cellContainer.add(
                        CreateCellObject(scene, width, 60),
                        { key: 'main', expand: true }
                    );

                    cellContainer.add(
                        CreateSeparator(scene, width, 8),
                        { key: 'separator', expand: true, padding: { top: 4, bottom: 4 } }
                    )

                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Don't assign minHeight as cell.height
                cellContainer.setMinWidth(width);

                // Set properties from item value
                var mainSizer = cellContainer.getElement('main'),
                    separator = cellContainer.getElement('separator');

                // mainSizer                
                mainSizer.getElement('text').setText(item.id); // Set text of text object
                mainSizer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                mainSizer.getElement('background').setStrokeStyle(2, COLOR_DARK);

                // separator
                if (index === items.length - 1) {
                    cellContainer.hide(separator);
                } else {
                    cellContainer.show(separator);
                }

                // Run layout to get cell height
                cellContainer.layout();
                cell.height = cellContainer.height;  // Set height of visible cell

                return cellContainer;
            },
            items: getItems(100)
        })
            .layout()

    }

    update() { }
}

var CreateCellObject = function (scene, width, height) {
    return scene.rexUI.add.label({
        width: width,
        height: height,

        orientation: 0,
        background: scene.rexUI.add.roundRectangle({ strokeColor: COLOR_DARK, strokeWidth: 2 }),
        icon: scene.rexUI.add.roundRectangle({ width: 20, height: 20, radius: 10, color: 0x0 }),
        text: scene.add.text(0, 0, ''),

        space: {
            icon: 10,
            left: 15,
        }
    });
}

var CreateSeparator = function (scene, width, height) {
    return scene.rexUI.add.roundRectangle({
        width: width, height: height, color: 0xCC0000
    });
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