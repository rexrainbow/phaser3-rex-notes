import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '')

        this.rexGestures.add.tap()
            .on('tap', function (tap) {
                print.text += 'Tap\n';
            }, this);

        this.rexGestures.add.tap({ taps: 2 })
            .on('tap', function (tap) {
                print.text += 'Double taps\n';
            }, this);

        this.rexGestures.add.tap({ taps: 3 })
            .on('tap', function (tap) {
                print.text += 'Tripple taps\n';
            }, this);
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