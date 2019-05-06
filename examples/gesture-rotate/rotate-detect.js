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

        var line = this.add.graphics({
            x: 400,
            y: 300,
            lineStyle: {
                width: 10,
                color: 0xffffff,
                alpha: 1
            },
        }).lineBetween(0, 0, 150, 0);

        var rotate = this.rexGestures.add.rotate(this);
        rotate
            .on('rotate', function (rotate) {
                line.angle += rotate.angle;
                print.text = rotate.angle;
            }, this)
            .on('rotatestart', function (rotate) {
                print.text = 'rotatestart';
            }, this)
            .on('rotateend', function (rotate) {
                print.text = 'rotateend';
            }, this)
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