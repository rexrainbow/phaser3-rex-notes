import 'phaser';
import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.print = print = this.add.text(0, 0, '')

        this.tapInput = this.rexGestures.add.tap()
            .on('tap', function (tap) {
                print.text += tap.tapsCount + ' tap(s)\n';
            }, this)
            .on('tappingstart', function (tap) {
                print.text = '';
            })
            .on('tapping', function (tap) {
                print.text += tap.tapsCount + ' tapping\n';
            })
    }

    update() {
        if (this.tapInput.isTapped) {
            this.print.text += 'update(): ' + this.tapInput.tapsCount + ' tap(s)\n';
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