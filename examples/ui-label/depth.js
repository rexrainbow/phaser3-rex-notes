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
        var label0 = createLabel(this, 'Label0').setPosition(200, 300).setDepth(0);
        var label1 = createLabel(this, 'Label1').setPosition(230, 330).setDepth(1);

        this.input.on('pointerdown', function () {
            label0.swapDepth(label1);
        });
    }

    update() { }
}

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(1, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10
        }
    })
        .layout();
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