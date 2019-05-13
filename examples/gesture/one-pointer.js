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

        this.rexGestures
            // Tap
            .on('tap', function (tap) {
                print.text += tap.tapsCount + ' tap(s)\n';
            }, this)
            // .on('tappingstart', function (tap) {
            //     print.text = '';
            // })
            // .on('tapping', function (tap) {
            //     print.text += tap.tapsCount + ' tapping\n';
            // })
            // Pan
            .on('pan', function (pan) {
                print.text += `pan (${pan.dx}, ${pan.dy})\n`;
            }, this)
            // .on('panstart', function (pan) {
            //     print.text = '';
            // })
            // Press
            .on('pressstart', function (press) {
                print.text += `press ${press.x},${press.y}\n`;
            }, this)
            .on('pressend', function (press) {
                print.text += 'press end\n';
            }, this)
            // Swipe
            .on('swipe', function (swipe) {
                print.text += `swipe, v = ${swipe.dragVelocity}\n`;
            }, this);
    }

    update() {
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