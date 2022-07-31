import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var label = CreateLabel(this).setPosition(400, 300).layout();
        console.log(label.x, label.y, label.width, label.height, label.originX, label.originY);
        var rt = label.snapshot({
            padding: 3
        });
        console.log(rt.x, rt.y, rt.width, rt.height, rt.originX, rt.originY);

        label.setAlpha(0.5);
    }

    update() { }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateLabel = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(5, 0xffffff, 1),

        text: scene.add.text(0, 0, 'AAAAA', {
            fontSize: '24px'
        }),

        icon: scene.add.rectangle(0, 0, 40, 40, COLOR_DARK),
        // iconMask: true,  // Can't apply mask before pasting to rendertexture
        action: scene.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, text: 10, },

        draggable: true,
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