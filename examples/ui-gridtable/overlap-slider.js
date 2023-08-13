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
            height: 520,

            scrollMode: 'y',

            background: this.rexUI.add.roundRectangle({ radius: 10, color: COLOR_PRIMARY }),

            table: {
                cellHeight: 80,

                columns: 1,

                mask: {
                    padding: { left: 100, right: 100, top: 2, bottom: 2 },
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, radius: 10, color: COLOR_DARK }),
                thumb: this.rexUI.add.roundRectangle({ radius: 13, color: COLOR_LIGHT }),
                position: 'left'
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

                        orientation: 'x',
                        background: scene.rexUI.add.roundRectangle({ color: COLOR_PRIMARY, strokeColor: COLOR_DARK, strokeWidth: 2 }),
                        icon: scene.rexUI.add.roundRectangle({ width: 60, height: 40, color: 0x0 }),
                        text: scene.add.text(0, 0, ''),

                        space: {
                            left: -20, right: 20, top: 20, bottom: 20,
                            icon: 10
                        }
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
            .drawBounds(this.add.graphics(), 0xff0000);

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