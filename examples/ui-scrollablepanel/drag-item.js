import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import DragPlugin from '../../plugins/drag-plugin.js';

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
        var items = CreateItems(60);

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: 300, height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle({
                radius: 20,
                color: COLOR_MAIN
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
            return CreateCellContainer(scene, item);
        },

        name: 'table'
    })
}

var CreateCellContainer = function (scene, item) {
    if (!item) {
        return;
    }

    var background = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK);
    var icon = scene.add.image(0, 0, item.textureKey).setTint(item.color);
    var text = scene.add.text(0, 0, item.id).setText(item.id)
    var container = scene.rexUI.add.overlapSizer({
        height: 80
    })
        .addBackground(background)
        .add(
            icon,
            { key: 'icon', align: 'center', expand: false }
        )
        .add(
            text,
            { key: 'id', align: 'left-top', expand: false }
        )

    icon
        .setInteractive({ draggable: true })
        .on('dragstart', function (pointer, dragX, dragY) {
            var isDragging = CanDrag(icon, pointer.worldX, pointer.worldY);
            icon.setData('isDragging', isDragging);
            if (!isDragging) {
                return;
            }

            var parentSizer = scene.rexUI.getParentSizer(icon);
            if (parentSizer) {
                parentSizer.remove(icon);
                parentSizer.removeChildrenMap('icon');
            }
        })
        .on('drag', function (pointer, dragX, dragY) {
            if (icon.getData('isDragging')) {
                icon.setPosition(dragX, dragY);
            }
        })
        .on('dragend', function (pointer, dragX, dragY, dropped) {
            icon.setData('isDragging', false);
        });

    return container
}

var CanDrag = function (gameObject, x, y) {
    return !gameObject.mask
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