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
        var buttons = this.rexUI.add.buttons({
            x: 400, y: 400,

            orientation: 'x',
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),
            buttons: [
                createButton(this, 'A').setOrigin(0.5, 1),
                createButton(this, 'B').setOrigin(0.5, 1),
                createButton(this, 'C').setOrigin(0.5, 1),
                createButton(this, 'D').setOrigin(0.5, 1),
                createButton(this, 'E').setOrigin(0.5, 1),
            ],

            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 6
            }

        })
            .setOrigin(0.5, 1)
            .layout()

        buttons.getElement('buttons').forEach(function (button) {
            button.popUp(1000, undefined, 'Back');
        })

    }

    update() { }
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 60,
        height: 60,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        align: 'center',
        space: {
            left: 10,
            right: 10,
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