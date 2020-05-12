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

const MOVE_SPEED = 300;
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

                item.input.draggable = false;

                var startX = item.getData('startX'), startY = item.getData('startY');
                var distance = Phaser.Math.Distance.Between(startX, startY, item.x, item.y);
                var duration = (distance / MOVE_SPEED) * 1000;
                item.moveToPromise(duration, startX, startY)
                    .then(function () {
                        item.input.draggable = true;
                    })
            })
            .on('drop', function (pointer, target) {
                var parent = item.getParentSizer();
                var parentItems = parent.getElement('items');
                var isLastItem = (parentItems[parentItems.length - 1] === item);
                parent.remove(item);
                if (!isLastItem) {
                    ArrangeItems(parent);
                }

                var startX = item.x, startY = item.y; // Save current position
                target.add(item).layout(); // Item is placed to new position in fixWidthSizer
                // Move item from start position to new position
                item.input.draggable = false;
                var distance = Phaser.Math.Distance.Between(startX, startY, item.x, item.y);
                var duration = (distance / MOVE_SPEED) * 1000;
                item.moveFromPromise(duration, startX, startY)
                    .then(function () {
                        item.input.draggable = true;
                    })
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
        var startX = item.getData('startX'), startY = item.getData('startY');
        var distance = Phaser.Math.Distance.Between(startX, startY, item.x, item.y);
        if (distance > 0) {
            item.input.draggable = false;
            var duration = (distance / MOVE_SPEED) * 1000;
            item.moveFromPromise(duration, startX, startY)
                .then(function () {
                    item.input.draggable = true;
                })
        }
    })
}

var CreatePanel = function (scene, words) {
    var panel0 = CreateSizer(scene, words)
        .layout()
    var panel1 = CreateSizer(scene)
        .setMinSize(panel0.width, panel0.height);

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
        orientation: 'x',
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