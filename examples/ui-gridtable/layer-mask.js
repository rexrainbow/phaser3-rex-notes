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
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: 400,
            height: 520,

            scrollMode: 'y',

            background: this.rexUI.add.roundRectangle({ radius: 10, color: COLOR_MAIN }),

            table: {
                cellHeight: 80,

                columns: 1,

                mask: {
                    padding: { top: 2, bottom: 2, left: 100, right: 100 }
                },

                enableLayer: true,
                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, radius: 10, color: COLOR_DARK }),
                thumb: this.rexUI.add.roundRectangle({ radius: 13, color: COLOR_LIGHT }),
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,

                table: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = CreateCellContainer(scene, width, height);
                }

                cell.setCellContainerAlign('center');

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                cellContainer.getElement('title').setFontSize(20).setText(item.title); // Set text of title object
                cellContainer.getElement('text').setText(item.description); // Set text of text object               
                cellContainer.getElement('background').setRadius(0).setStrokeStyle(2, COLOR_DARK);

                // Hide text and separator
                cellContainer.hide(cellContainer.getElement('text'));
                cellContainer.hide(cellContainer.getElement('separator'));
                cellContainer.setDepth(0);

                return cellContainer;
            },
            items: CreateItems(100)
        })
            .on('cell.over', function (cellContainer, cellIndex, pointer, event) {
                cellContainer.show(cellContainer.getElement('text'));
                cellContainer.show(cellContainer.getElement('separator'));
                cellContainer.getElement('title').setFontSize(16);
                cellContainer.getElement('background').setRadius(20).setStrokeStyle(4, COLOR_LIGHT);
                cellContainer.layout().setDepth(1);
            })
            .on('cell.out', function (cellContainer, cellIndex, pointer, event) {
                cellContainer.hide(cellContainer.getElement('text'));
                cellContainer.hide(cellContainer.getElement('separator'));
                cellContainer.getElement('title').setFontSize(20);
                cellContainer.getElement('background').setRadius(0).setStrokeStyle(2, COLOR_DARK);
                cellContainer.layout().setDepth(0);
            })
            .layout()
    }

    update() { }
}

var CreateCellContainer = function (scene, width, height) {
    return scene.rexUI.add.titleLabel({
        width: width,
        height: height,

        orientation: 'x',
        background: scene.rexUI.add.roundRectangle({ color: COLOR_MAIN, strokeColor: COLOR_DARK, strokeWidth: 2 }),
        icon: scene.rexUI.add.roundRectangle({ radius: 20, color: 0x0 }),
        title: scene.add.text(0, 0, ''),
        text: scene.add.text(0, 0, ''),
        separator: scene.rexUI.add.roundRectangle({ height: 3, color: COLOR_DARK }),

        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            icon: 10, separator: 5,
        }
    })
        .enableLayoutWarn(false)
}

var CreateItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            title: `${i} Title.Title`,
            description: 'Description.Description.Description\nDescription.Description.Description\nDescription.Description.Description',
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