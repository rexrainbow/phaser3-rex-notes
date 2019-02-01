import RotateToPlugin from '../../plugins/rotateto-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var bar = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRect(0, -10, 100, 20)
            .fillStyle(0x00ffff, 1)
            .fillRect(90, -10, 20, 20)            
            .setPosition(400, 300);
        bar.rotateTo = this.plugins.get('rexRotateTo').add(bar, {
            speed: 180
        }).on('complete', function () {
            console.log('Reach target');
        })
        this.input.on('pointerdown', function (pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            bar.rotateTo.rotateTowardsPosition(touchX, touchY);
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
            key: 'rexRotateTo',
            plugin: RotateToPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);