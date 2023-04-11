import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import DragPlugin from '../../plugins/drag-plugin.js';

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

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var items = CreateItems(100);

        var gridTable = this.rexUI.add.gridTable({
            x: 400, y: 300,
            width: 300, height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle({
                radius: 20,
                color: COLOR_PRIMARY
            }),

            table: {
                cellHeight: 80,

                columns: 2,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(
                    {
                        width: 20,
                        radius: 10,
                        color: COLOR_DARK
                    }),
                thumb: this.rexUI.add.roundRectangle({
                    radius: 13,
                    color: COLOR_LIGHT
                }),
            },

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
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.overlapSizer()
                        .addBackground(
                            scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            undefined, 'background'
                        )
                        .add(
                            scene.add.image(0, 0, ''),
                            { key: 'icon', align: 'center', expand: false }
                        )
                        .add(
                            scene.add.text(0, 0, ''),
                            { key: 'id', align: 'left-top', expand: false }
                        )
                }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo

                var icon = cellContainer.getElement('icon');
                if (item.textureKey) {
                    icon.setTexture(item.textureKey).setTint(item.color)
                }
                cellContainer.setChildVisible(icon, !!item.textureKey);

                var idText = cellContainer.getElement('id');
                idText.setText(item.id);

                return cellContainer;
            },
            items: items
        })
            .layout()


        gridTable
            .on(`cell.pressstart`, function (cellContainer, cellIndex, pointer) {
                var item = items[cellIndex];
                if (!item.textureKey) {
                    return;
                }

                var icon = cellContainer.getElement('icon');
                if (this.rexUI.isInTouching(icon)) {
                    // Create a new game object for dragging
                    var dragObject = this.add.image(icon.x, icon.y, '');
                    dragObject.setTexture(item.textureKey).setTint(item.color);
                    dragObject.drag = this.plugins.get('rexDrag').add(dragObject).drag()

                    // icon has be removed, set it to invisible
                    item.textureKey = undefined;
                    cellContainer.setChildVisible(icon, false);
                }
            }, this);
    }

    update() { }
}

var CreateItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            textureKey: 'mushroom',
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
        global: [{
            key: 'rexDrag',
            plugin: DragPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);