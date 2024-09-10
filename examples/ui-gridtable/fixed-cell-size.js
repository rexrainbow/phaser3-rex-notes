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
            x: 200,
            y: 250,
            width: 300,
            height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle({ color: COLOR_MAIN }),

            table: {
                cellWidth: 60,
                cellHeight: 60,
                fixedCellSize: true,

                mask: {
                    padding: 2,
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
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.label({
                        background: scene.rexUI.add.roundRectangle(),
                    });
                }

                // Set properties from item value
                cellContainer.setMinSize(width - 3, height - 3);
                cellContainer.getElement('background').setFillStyle(item.color);
                return cellContainer;
            },
            items: getItems(100)
        })
            .layout()

        AddDragCornerController(gridTable)

        this.add.text(0, 580, 'Reset all cells size')
            .setInteractive()
            .once('pointerdown', function () {
                gridTable.resetAllCellsSize(30, 30)
            })
    }

    update() { }
}

var AddDragCornerController = function (sizer) {
    var scene = sizer.scene;

    var bottomRighterController = scene.add.rectangle(sizer.right, sizer.bottom, 30, 30, 0x333333);
    var topLeftController = scene.add.rectangle(sizer.left, sizer.top, 30, 30, 0x333333);

    sizer.pin(bottomRighterController)
    sizer.pin(topLeftController)

    bottomRighterController
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            var topX = sizer.left,
                topY = sizer.top;
            var width = dragX - topX,
                height = dragY - topY;

            sizer.setChildPosition(bottomRighterController, dragX, dragY);
            sizer.setChildPosition(topLeftController, topX, topY);

            sizer.setMinSize(width, height).layout();

            sizer.left = topX;
            sizer.top = topY;
        })


    topLeftController
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            sizer.x += dragX - topLeftController.x;
            sizer.y += dragY - topLeftController.y;
        })

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