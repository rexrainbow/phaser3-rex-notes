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
        var sizer0 = CreatePanel(this, 12).setPosition(250, 300).layout();
        var sizer1 = CreatePanel(this, 8).setPosition(400, 300).layout();
        var sizer2 = CreatePanel(this, 0).setPosition(550, 300).layout();


        var sizers = [sizer0, sizer1, sizer2];
        sizers.forEach(function (sizer) {
            sizer.setInteractive({ dropZone: true });
            SetDragable(sizer.getElement('items'));
        })
    }

    update() { }
}

var CreatePanel = function (scene, itemCount) {
    if (itemCount === undefined) {
        itemCount = 0;
    }

    var sizer = scene.rexUI.add.sizer({
        width: 120, height: 500,
        orientation: 'y',
        space: { left: 6, right: 6, top: 6, bottom: 6, item: 6 },
    })
        .setDepth(-1)
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK).setDepth(-1))

    for (var i = 0; i < itemCount; i++) {
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
        height: 60,
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

var SetDragable = function (children) {
    children.forEach(function (child) {
        child
            .setInteractive({ draggable: true })
            .on('dragstart', function (pointer, dragX, dragY) {
                // Save start position
                child.setData({ startX: child.x, startY: child.y });
            })
            .on('drag', function (pointer, dragX, dragY) {
                // On dragging
                child.setPosition(dragX, dragY);
            })
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                if (dropped) { // Process 'drop' event
                    return;
                }

                // Back to start position if not dropping on another sizer
                child.moveTo({
                    x: child.getData('startX'), y: child.getData('startY'),
                    speed: 300
                });
            })
            .on('drop', function (pointer, sizer) {
                // Drop at another sizer
                var parent = child.getParentSizer();
                parent.remove(child);
                ArrangeItems(parent);

                // Item is placed to new position in sizer
                sizer.insertAtPosition(
                    pointer.x, pointer.y,
                    child,
                    {
                        expand: true
                    }
                );
                // Move child from start position to new position
                ArrangeItems(sizer);
            })
    });
}

var ArrangeItems = function (sizer) {
    var children = sizer.getElement('items');
    // Save current position
    children.forEach(function (child) {
        child.setData({ startX: child.x, startY: child.y });
    })
    // Item is placed to new position in sizer
    sizer.layout();
    // Move child from start position to new position
    children.forEach(function (child) {
        var fromX = child.getData('startX'),
            fromY = child.getData('startY');
        if ((child.x !== fromX) || (child.y !== fromY)) {
            child.moveFrom({ x: fromX, y: fromY, speed: 300 })
        }
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