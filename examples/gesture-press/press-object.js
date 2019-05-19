import GesturesPlugin from '../../plugins/gestures-plugin.js';

const RandomBetween = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.input.addPointer(9);

        var colorTag = this.add.text(0, 0, '')
            .setVisible(false)
            .setDepth(1);
        var gameObject;
        for (var i = 0; i < 8; i++) {
            gameObject = this.add.rectangle(
                RandomBetween(100, 700),
                RandomBetween(100, 500),
                100,
                100,
                RandomBetween(0, 0x1000000)
            );

            this.rexGestures.add.press(gameObject)
                .on('pressstart', function (press) {
                    colorTag
                        .setVisible(true)
                        .setPosition(press.worldX + 10, press.worldY + 10)
                        .setText(press.gameObject.fillColor.toString(16));
                })
                .on('pressend', function (press) {
                    colorTag.setVisible(false);
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