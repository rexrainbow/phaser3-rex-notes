import GesturesPlugin from '../../plugins/gestures-plugin.js';

const RandomBetween = Phaser.Math.Between;

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
        this.input.addPointer(9);

        var gameObject;
        for (var i = 0; i < 8; i++) {
            gameObject = this.add.rectangle(
                RandomBetween(100, 700),
                RandomBetween(100, 500),
                100,
                100,
                COLOR_DARK
            )
                .setStrokeStyle(1, COLOR_LIGHT);

            this.rexGestures.add.press(gameObject)
                .on('pressstart', function (press) {
                    press.gameObject.setFillStyle(COLOR_PRIMARY);
                })
                .on('pressend', function (press) {
                    press.gameObject.setFillStyle(COLOR_DARK);
                });
        }
    }
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
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);