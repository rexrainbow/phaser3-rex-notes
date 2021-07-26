import 'phaser';
import MouseWheelScrollerPlugin from '../../plugins/mousewheelscroller-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var circle = this.add.circle(400, 300, 20, 0xffffff);
        var scroller = this.plugins.get('rexMouseWheelScroller').add(circle, { speed: 0.1 })
            .on('scroll', function (inc, gameObject, scroller) {
                var newX = gameObject.x + inc;
                gameObject.setX(Phaser.Math.Clamp(newX, 0, 800));
            });

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
        global: [{
            key: 'rexMouseWheelScroller',
            plugin: MouseWheelScrollerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);