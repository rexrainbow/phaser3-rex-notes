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

    preload() {
    }

    create() {
        var label = this.rexUI.add.label({
            background: this.rexUI.add.roundRectangle({
                radius: 20,
                strokeColor: COLOR_LIGHT
            }),
            text: this.add.text(0, 0, 'Phaser', { fontSize: 40 }),
            icon: this.rexUI.add.roundRectangle({
                width: 40, height: 40,
                color: COLOR_PRIMARY
            }),
            space: {
                left: 20, right: 20, top: 20, bottom: 20, icon: 10
            },

            draggable: true
        })
            .setPosition(400, 300)
            .layout()

        var print = this.add.text(0, 0, '');
        var button = this.rexUI.add.roundRectangle({
            x: 520, y: 340,
            width: 30, height: 30,
            color: COLOR_DARK,
            strokeColor: COLOR_LIGHT
        })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', function () {
                print.text += 'Click button\n';
            })

        label.pin(button)

    }

    update() { }
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