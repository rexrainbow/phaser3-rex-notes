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

        var gameObject;
        for (var i = 0; i < 8; i++) {
            gameObject = this.add.rectangle(
                RandomBetween(100, 700),
                RandomBetween(100, 500),
                100,
                100,
                RandomBetween(0, 0x100000)
            )

            this.rexGestures.add.pan(gameObject)
                .on('pan', function (pan) {
                    pan.gameObject.x += pan.dx;
                    pan.gameObject.y += pan.dy;
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