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
        var items = CreateItems(60);

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: 300, height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle({
                radius: 20,
                color: COLOR_PRIMARY
            }),

            panel: {
                child: CreateGrid(this, items, 2),
                mask: {
                    padding: 2,
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle({
                    width: 20,
                    radius: 10,
                    color: COLOR_DARK
                }),
                thumb: this.rexUI.add.roundRectangle({
                    radius: 13,
                    color: COLOR_LIGHT
                }),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()

        scrollablePanel.setChildrenInteractive({
            targets: [
                scrollablePanel.getByName('table', true),
            ]
        })
            .on('child.pressstart', function (child) {
                var item = child.getData('item');
                if (!item || !item.textureKey) {
                    return;
                }

                var icon = child.getElement('icon');
                if (this.rexUI.isInTouching(icon)) {
                    // Create a new game object for dragging
                    var dragObject = this.add.image(icon.x, icon.y, '');
                    dragObject.setTexture(item.textureKey).setTint(item.color);
                    // Force dragging
                    dragObject.drag = this.plugins.get('rexDrag').add(dragObject).drag()

                    // icon has be removed, set it to invisible
                    item.textureKey = undefined;
                    child.setChildVisible(icon, false);
                }
            }, this)
    }

    update() { }
}

var CreateGrid = function (scene, items, col) {
    if (col === undefined) {
        col = 1;
    }

    return scene.rexUI.add.gridSizer({
        column: col,
        row: Math.ceil(items.length / col),

        columnProportions: 1,

        createCellContainerCallback: function (scene, x, y, config, gridSizer) {
            config.expand = true;

            var item = items[(y * col) + x];
            var cellContainer = CreateCellContainer(scene).setData('item', item);
            if (item) {
                cellContainer.getElement('icon').setTexture(item.textureKey).setTint(item.color);
                cellContainer.getElement('id').setText(item.id);
            }
            return cellContainer;
        },

        name: 'table'
    })
}

var CreateCellContainer = function (scene, item) {
    return scene.rexUI.add.overlapSizer({
        height: 80
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK))
        .add(
            scene.add.image(0, 0, ''),
            { key: 'icon', align: 'center', expand: false }
        )
        .add(
            scene.add.text(0, 0, ''),
            { key: 'id', align: 'left-top', expand: false }
        )
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