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
        var sizer0 = this.rexUI.add.sizer({

            orientation: 'x'
        })
            .add(
                createItems(this, 'y'),
                { proportion: 0, expand: true }
            )
            .add(
                createItems(this, 'x'),
                { proportion: 1, expand: true }
            )
        var sizer1 = this.rexUI.add.sizer();

        var topSizer = this.rexUI.add.sizer({
            x: 400,
            y: 300,
            width: 400,
            height: 400,
            orientation: 'y'
        })
            .add(
                sizer0,
                { proportion: 1, expand: true }
            )
            .add(
                sizer1,
                { proportion: 1, expand: true }
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var createItems = function (scene, orientation) {
    var sizer = scene.rexUI.add.fixWidthSizer({
        orientation: orientation,
        space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8,
        }
    });
    for (var i = 0; i < 10; i++) {
        sizer.add(createItem(scene));
    }
    return sizer;
}

var createItem = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_MAIN),
        text: scene.add.text(0, 0, 'A', {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        }
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