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
        this.load.image('volume', 'assets/images/volume.png');
        this.load.image('card', 'assets/images/card.jpg');
    }

    create() {
        this.rexUI.add.label({
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            text: this.add.text(0, 0, 'Phaser', { fontSize: 40 }),
            icon: this.add.image(0, 0, 'card'),
            iconSize: 40,
            space: {
                left: 20, right: 20, top: 20, bottom: 20, icon: 10
            }
        })
            .setPosition(400, 300)
            .layout()
            .setInteractive()
            .on('pointerdown', function () {
                var nextKey = (this.texture.key === 'card') ? 'volume' : 'card';
                this.setTexture(nextKey);
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