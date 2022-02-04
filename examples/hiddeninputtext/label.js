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

    preload() {
    }

    create() {
        var label = this.rexUI.add.label({
            x: 400, y: 300,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),

            text: this.add.text(0, 0, '', {
                fontSize: '24px',
                lineSpacing: 5,
                fixedWidth: 300,
                fixedHeight: 200,
                padding: { left: 5, right: 5, top: 5, bottom: 5 }
            }),

            icon: this.add.rectangle(0, 0, 40, 40, COLOR_DARK),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
            .layout()

        var textEdit = this.rexUI.add.hiddenTextEdit(label, {
            type: 'textarea',
        })
            .on('focus', function (textEdit) {
                textEdit.textObject.getElement('background').setStrokeStyle(2, 0xffffff)
            })
            .on('blur', function () {
                textEdit.textObject.getElement('background').setStrokeStyle()
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