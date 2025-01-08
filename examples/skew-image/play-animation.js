import phaser from '../../../phaser/src/phaser.js';
import QuadImagePlugin from '../../plugins/quadimage-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('knight', 'assets/animations/knight.png', 'assets/animations/knight.json');
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: -1
        });

        var gameObject = this.add.rexSkewImage(400, 300)
            .setScale(2)
            .setOrigin(0.5, 1)

        gameObject.anims.play('idle');

        var gui = new Dat.GUI();
        gui.add(gameObject, 'skewXDeg', -90, 90);
        gui.add(gameObject, 'skewYDeg', -90, 90);

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);
    }

    update() {
        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(2, 0xff0000);
    }
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
    scene: Demo,
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexQuadImage',
            plugin: QuadImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);