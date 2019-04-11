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
        this.load.image('close', 'assets/images/close.png');
    }

    create() {
        var label = this.rexUI.add.label({
            x: 400,
            y: 300,

            orientation: 0,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            text: this.add.text(0, 0, 'Lable', {
                fontSize: '24px'
            }),
            icon: this.rexUI.add.roundRectangle(0, 0, 2, 2, 30, COLOR_DARK),
            // action: this.add.image(0, 0, 'close').setTint(COLOR_LIGHT),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
            .layout();

        this.input
            .on('pointerup', function (pointer) {
                label.visible = !label.visible;
            });


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