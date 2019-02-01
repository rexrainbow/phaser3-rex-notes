import MoveToPlugin from '../../plugins/moveto-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var dot = this.add.circle(100, 100, 20, 0xffffff);
        dot.moveTo = this.plugins.get('rexMoveTo').add(dot, {
            speed: 400,
            rotateToTarget: true
        }).on('complete', function () {
            console.log('Reach target');
        })
        this.input.on('pointerdown', function (pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            dot.moveTo.moveTo(touchX, touchY);
        });
    }

    update() {}
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
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);