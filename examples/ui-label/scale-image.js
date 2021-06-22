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
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var label = this.rexUI.add.label({
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            text: this.add.text(0, 0, 'Label', {
                fontSize: '24px'
            }),
            icon: this.add.image(0, 0, 'mushroom'),
            action: this.add.image(0, 0, 'mushroom').setDisplaySize(36, 36),
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
            .setPosition(200, 300)

        this.input.once('pointerup', function () {
            label.getElement('icon').setDisplaySize(36, 36);
            label.layout().setPosition(400, 300);

            //label.resetChildScaleState(label.getElement('icon').setDisplaySize(36, 36))
            //label.setPosition(400, 300).layout()
        })
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