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


        var items = panel.getElement('panel0.items');
        this.rexUI.waitComplete(PopupItems(items))
            .then(function () {
                SetDragable(items);
            })
    }

    update() { }
}

var CreatePanel = function (scene, words) {
    var sizer0 = CreateSizer(scene, words)
        .layout()
    var sizer1 = CreateSizer(scene)
        .setMinSize(sizer0.width, sizer0.height);

    return scene.rexUI.add.sizer({
        orientation: 'y'
    })
        .add(sizer0, { key: 'panel0' })
        .add(sizer1, { padding: { top: 40 }, key: 'panel1' });
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
        var label;
        for (var i = 0, cnt = words.length; i < cnt; i++) {
            label = CreateLabel(scene, words[i])
                .layout()
                .setDirty(false)
            sizer.add(label);
        }
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

var PopupItems = function (items) {
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

var SetDragable = function (items) {
    items.forEach(function (item) {
        item.setInteractive();
        item.scene.input.setDraggable(item);
        item
            .on('dragstart', function (pointer, dragX, dragY) {
                item.setData({ startX: item.x, startY: item.y });
            })
            .on('drag', function (pointer, dragX, dragY) {
                item.setPosition(dragX, dragY);
            })
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                item.input.draggable = false;
                item.moveToPromise(1000, item.getData('startX'), item.getData('startY'))
                    .then(function () {
                        item.input.draggable = true;
                    })
            })
    });
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