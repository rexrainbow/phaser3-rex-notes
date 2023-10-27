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

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var label = this.rexUI.add.label({
            x: 400, y: 300,
            height: 140,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN),

            text: this.add.bitmapText(100, 100, 'gothic', ''),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            }
        })
            .layout()

        this.rexUI.add.hiddenEdit(label, {
            type: 'textarea',
            enterClose: false,

            onOpen(textObject) {
                textObject.getElement('background').setStrokeStyle(2, 0xffffff)
            },

            onClose(textObject) {
                textObject.getElement('background').setStrokeStyle()
            },
        })
            .on('textchange', function () {
                label.layout()
            })
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    dom: {
        createContainer: true
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