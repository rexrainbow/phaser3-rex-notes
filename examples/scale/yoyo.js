import phaser from 'phaser/src/phaser.js';
import ScalePlugin from '../../plugins/scale-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var obj = this.add.rectangle(400, 300, 100, 100, 0x00bcd4);

        obj
            .setInteractive()
            .on('pointerdown', function () {
                this.plugins.get('rexScale').yoyo(obj, 1000, 1.2, 3)
            }, this)
    }

    update() { }
}

var config = {
    type: Phaser.CANVAS,
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
            key: 'rexScale',
            plugin: ScalePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);