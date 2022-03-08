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
        var buttons = this.rexUI.add.buttons({
            x: 400, y: 400,

            orientation: 'x',
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),
            buttons: [
                createButton(this, 'A'),
                createButton(this, 'B'),
                createButton(this, 'C'),
                createButton(this, 'D'),
                createButton(this, 'E'),
            ],

            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 6
            }

        })
            .layout()

        buttons
            .on('button.click', function (button, index, pointer, event) {
                button.shake();
            })

        this.buttons = buttons;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        // Position of Button objects won't change
        var s = ''
        this.buttons.getElement('buttons').forEach(function (gameObject) {
            s += `${gameObject.x}, ${gameObject.y}\n`;
        })
        this.print.text = s;

    }
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