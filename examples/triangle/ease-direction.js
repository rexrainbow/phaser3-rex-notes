import phaser from 'phaser/src/phaser.js';
import TrianglePlugin from '../../plugins/triangle-plugin.js';
import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');
        var triangle = this.add.rexTriangle(400, 300, 100, 100, 0x888888)
            .setStrokeStyle(4, 0xffffff)
            .setPadding(10)
            .setDirection('up')

        // triangle.setArrowOnly()

        var graphics = this.add.graphics({
            lineStyle: {
                width: 1, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(triangle.getBounds())

        this.rexGestures.add.swipe({
            dir: '4dir',
        })
            .on('swipe', function (swipe) {
                if (swipe.left) {
                    triangle.setDirection('left', 300);
                } else if (swipe.right) {
                    triangle.setDirection('right', 300);
                } else if (swipe.up) {
                    triangle.setDirection('up', 300);
                } else if (swipe.down) {
                    triangle.setDirection('down', 300);
                }
                print.text = `Direction=${triangle.direction}`;
            }, this);

        print.text = `Direction=${triangle.direction}`;

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
        global: [{
            key: 'rexTriangle',
            plugin: TrianglePlugin,
            start: true
        }],
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);