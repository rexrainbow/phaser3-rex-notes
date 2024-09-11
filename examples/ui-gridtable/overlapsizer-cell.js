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

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var gridTable = this.rexUI.add.gridTable({
            x: 400, y: 300,
            width: 380, height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_MAIN),

            table: {
                cellWidth: 100,
                cellHeight: 100,
                fixedCellSize: true,

                mask: {
                    padding: 2,
                },
                // enableLayer: true,

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            scroller: {
                // pointerOutRelease: false,
            },

            mouseWheelScroller: {
                focus: true,
                speed: 0.1
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                table: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item;
                if (cellContainer === null) {
                    var background = scene.rexUI.add.roundRectangle({ strokeColor: COLOR_DARK, radius: 10 });
                    var icon = scene.add.image(0, 0, 'mushroom')
                    var text = scene.add.text(0, 0, '');

                    cellContainer = scene.rexUI.add.overlapSizer()
                        .addBackground(background)
                        .add(icon, { expand: false, key: 'icon' })
                        .add(text, { expand: false, align: 'left-bottom', offsetX: 5, offsetY: -5, key: 'text' })
                        .setMinSize(width - 3, height - 3)
                }

                cellContainer.getElement('icon').setTint(item.color)
                cellContainer.getElement('text').setText(item.id)

                return cellContainer;
            },
            items: CreateItems(100)
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