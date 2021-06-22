import 'phaser';
import TouchStatePlugin from '../../plugins/touchstate-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var bg = this.add.rectangle(400, 300, 300, 300, 0xcccccc);
        var star = this.add.rectangle(400, 300, 10, 10, 0xff0000);

        var touchState = this.plugins.get('rexTouchState').add(bg);
        touchState
            .on('touchmove', function (pointer) {
                star.x += touchState.dx;
                star.y += touchState.dy;
            });
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
            key: 'rexTouchState',
            plugin: TouchStatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);