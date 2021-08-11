import 'phaser';
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
        var content = `Phaser is a fast free and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers`
        var words = Phaser.Utils.Array.Shuffle(content.split(' '));

        var panel = CreatePanel(this, words)
            .setPosition(400, 300)
            .layout()

        var items = panel.getElement('panels[0].items');
        this.rexUI.waitComplete(Popup(items))
            .then(function () {
                SetDragable(items);
                SetDropZone(panel.getElement('panels'))
            })
    }

    update() { }
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

                var insertIndex = GetInsertIndex(target, pointer);
                // Item is placed to new position in fixWidthSizer
                target
                    .add(item, {
                        index: (insertIndex >= 0) ? insertIndex : undefined
                    })
                // Move item from start position to new position
                ArrangeItems(target);
            })
    });
}

var SetDropZone = function (zones) {
    zones.forEach(function (zone) {
        zone
            .setInteractive({ dropZone: true })
    })
}

var Popup = function (items) {
    var scene = items[0].scene;
    return scene.tweens.add({
        targets: items,
        scaleX: { start: 0, to: 1 },
        scaleY: { start: 0, to: 1 },
        ease: 'Back',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 1000,
        delay: scene.tweens.stagger(100),
        repeat: 0,            // -1: infinity
        yoyo: false
    })
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

var DistanceBetween = Phaser.Math.Distance.Between;
var GetInsertIndex = function (panel, pointer) {
    var items = panel.getElement('items');
    if (items.length === 0) {
        return -1;
    }

    var candidators = [];
    items.forEach(function (item, index, arr) {
        if (Math.abs(item.centerY - pointer.y) > (item.height / 2)) {
            return;
        }

        candidators.push({
            index: index,
            distance: DistanceBetween(item.left, item.centerY, pointer.x, pointer.y)
        })

        var nextItem = arr[index + 1];
        if (!nextItem || (nextItem.y === item.y)) {
            return;
        }

        // nextItem is at next line
        candidators.push({
            index: (index + 1),
            distance: DistanceBetween(item.right, item.centrtY, pointer.x, pointer.y)
        })
    })
    if (candidators.length === 0) {
        return -1;
    }
    candidators.sort(function (data0, data1) {
        var d0 = data0.distance, d1 = data1.distance;
        return (d0 > d1) ? 1 :
            (d0 < d1) ? -1 : 0;
    })
    return candidators[0].index;
}

var CreatePanel = function (scene, words) {
    var panel0 = CreateSizer(scene, words)
    var panel1 = CreateSizer(scene)

    return scene.rexUI.add.sizer({
        orientation: 'y'
    })
        .add(panel0)
        .add(panel1, { padding: { top: 40 } })
        .addChildrenMap('panels', [panel0, panel1])
}

var CreateSizer = function (scene, words) {
    var sizer = scene.rexUI.add.fixWidthSizer({
        width: 400, height: 250,
        space: {
            left: 10, right: 10, top: 10, bottom: 10,
            item: 5, line: 5
        }
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK))

    if (words) {
        words.forEach(function (word) {
            var label = CreateLabel(scene, word)
                .layout()
                .setDirty(false)  // Don't layout me again
            sizer.add(label)
        })
    }

    return sizer;
}

var CreateLabel = function (scene, text) {
    var label = scene.rexUI.add.label({
        height: 20,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        }
    })
        .setDepth(1)
    return label;
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