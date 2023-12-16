import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var items = [
            { name: 'ItemA', item: CreateSingleGO(this) },
            { name: 'ItemB', item: CreateSizerGO(this) },
        ]
        var ui = CreateUI(this, items)
            .setPosition(400, 300)
            .layout()
    }

    update() { }
}

var CreateSingleGO = function (scene) {
    return scene.rexUI.add.roundRectangle({ width: 200, height: 200, color: COLOR_DARK })
}

var CreateSizerGO = function (scene) {
    return scene.rexUI.add.label({
        width: 200, height: 200,
        background: scene.rexUI.add.roundRectangle({ color: COLOR_DARK }),
        text: scene.add.text(0, 0, 'Label'),
        align: 'center'
    })
}

var CreateUI = function (scene, items) {
    var background = scene.rexUI.add.roundRectangle({ radius: 10, color: COLOR_MAIN });

    var ui = scene.rexUI.add.sizer({
        orientation: 'x',
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
    })
        .addBackground(background)

    for (var i = 0, cnt = items.length; i < cnt; i++) {
        ui.add(CreateItemBox(scene, items[i]));
    }

    // All children are added to container(sizer), bring items to top
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        ui.bringChildToTop(items[i].item);
    }

    return ui;
}

var CreateItemBox = function (scene, { name, item }) {
    var background = scene.rexUI.add.roundRectangle({
        radius: {
            radius: { tl: 20, tr: 20 },
            iteration: 0
        },
        strokeColor: COLOR_LIGHT
    });

    var title = scene.add.text(0, 0, name);

    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
    })
        .addBackground(background)
        .add(title)
        .add(item)
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