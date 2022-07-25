import phaser from 'phaser/src/phaser.js';
import AlphaMaskImagePlugin from '../../plugins/alphamaskimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('volume', 'assets/images/volume.png');
    }

    create() {
        this.add.rexAlphaMaskImage(400, 300, 'classroom', {
            mask: 'volume',
            // invertMaskAlpha: true,
            // maskScale: 4,
            // backgroundColor: 'aliceblue'
        })
            .setScale(0.75);

        this.add.image(0, 0, 'volume').setOrigin(0);
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
            key: 'rexAlphaMaskImage',
            plugin: AlphaMaskImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);