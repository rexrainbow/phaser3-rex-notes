import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '--')

        this.rexGestures.add.pan()
            .on('pan', function (pan) {
                print.text += `pan (${pan.dx}, ${pan.dy})\n`;
            }, this)
            .on('panstart', function (pan) {
                print.text = '';
            });

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