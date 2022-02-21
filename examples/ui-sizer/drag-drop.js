import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = CreatePanel(this)
            .setPosition(400, 300)
            .layout()
            .setInteractive({ dropZone: true });

        SetDragable(sizer.getElement('items'));
    }

    update() { }
}

var CreatePanel = function (scene) {
    var sizer = scene.rexUI.add.sizer({
        width: 120, height: 500,
        orientation: 'y',
        space: { left: 6, right: 6, top: 6, bottom: 6, item: 6 },
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK))

    for (var i = 0; i < 10; i++) {
        sizer.add(
            CreateLabel(scene, i.toString()),
            {
                expand: true
            }
        );
    }
    return sizer;
}

var CreateLabel = function (scene, text) {
    var label = scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'center',
        space: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        },

    })
    return label;
}

var SetDragable = function (items) {
    items.forEach(function (item) {
        item
            .setInteractive({ draggable: true })
            .on('dragstart', function (pointer, dragX, dragY) {
                item.setData({ startX: item.x, startY: item.y });
            })
            .on('drag', function (pointer, dragX, dragY) {
                item.setPosition(dragX, dragY);
            })
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                if (dropped) { // Process 'drop' event
                    return;
                }

                item.moveTo({
                    x: item.getData('startX'), y: item.getData('startY'),
                    speed: 300
                });
            })
            .on('drop', function (pointer, target) {
                var parent = item.getParentSizer();
                parent.remove(item);
                ArrangeItems(parent);

                // Item is placed to new position in fixWidthSizer
                target.insertAtPosition(
                    pointer.x, pointer.y,
                    item,
                    {
                        expand: true
                    }
                );
                // Move item from start position to new position
                ArrangeItems(target);
            })
    });
}

var ArrangeItems = function (panel) {
    var items = panel.getElement('items');
    // Save current position
    items.forEach(function (item) {
        item.setData({ startX: item.x, startY: item.y });
    })
    // Item is placed to new position in fixWidthSizer
    panel.layout();
    // Move item from start position to new position
    items.forEach(function (item) {
        item.moveFrom({
            x: item.getData('startX'), y: item.getData('startY'),
            speed: 300
        })
    })
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