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
        this.rexUI.add.sizer({
            x: 400, y: 100,
            width: 700, height: 50,
            orientation: 0
        })
            .add(
                createLabel(this, 'b0', 'left'),  // child
                { proportion: 1, expand: true }
            )
            .add(
                createLabel(this, 'b1', 'center'),  // child
                { proportion: 1, expand: true }
            )
            .add(
                createLabel(this, 'b2', 'right'),  // child
                { proportion: 1, expand: true }
            )
            .layout()

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 300, height: 50,
            orientation: 1
        })
            .setOrigin(0.5, 0)
            .add(
                createLabel(this, 'b0', 'left'),  // child
                { proportion: 1, expand: true }
            )
            .add(
                createLabel(this, 'b1', 'center'),  // child
                { proportion: 1, expand: true }
            )
            .add(
                createLabel(this, 'b2', 'right'),  // child
                { proportion: 1, expand: true }
            )
            .layout()
    }

    update() { }
}

var createLabel = function (scene, text, align) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, text),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        align: align,
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10
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