import phaser from 'phaser/src/phaser.js';
import RepeatImagePlugin from '../../plugins/repeatimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'assets/images/backgrounds/pixelart.png');
    }

    create() {
        // 2346 x 1628
        this.add.rexRepeatImage(0, 0, 2346, 1628, 'bg').setOrigin(0);

        var camera = this.cameras.main;
        camera.setZoom(4).centerOn(400, 900)
        this.input.on('pointerdown', function (pointer) {
            camera.pan(pointer.worldX, pointer.worldY, 500);
        });
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexRepeatImage',
            plugin: RepeatImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);