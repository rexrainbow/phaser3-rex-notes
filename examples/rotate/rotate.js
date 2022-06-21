import phaser from 'phaser/src/phaser.js';
import RotatePlugin from '../../plugins/rotate-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var bar = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRect(0, -10, 100, 20)
            .fillStyle(0x00ffff, 1)
            .fillRect(90, -10, 20, 20)
            .setPosition(400, 300);
        bar.rotate = this.plugins.get('rexRotate').add(bar, {
            enable: true,
            speed: 180
        })

        this.input
            .on('pointerdown', function () {
                bar.rotate.setSpeed(60)
            })
            .on('pointerup', function () {
                bar.rotate.setSpeed(180)
            })
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
            key: 'rexRotate',
            plugin: RotatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);