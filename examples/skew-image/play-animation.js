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

        this.add.sprite(400, 400)
            .setScale(4)
            .setAlpha(1)
            //.setOrigin(0.5, 1)
            .play('idle')

        this.gameObject = this.add.rexSkewImage(400, 400)
            .setScale(4)
            .setAlpha(0.3)
            //.setOrigin(0.5, 1)
            .play('idle')

        var gui = new Dat.GUI();
        gui.add(this.gameObject, 'skewXDeg', -90, 90);
        gui.add(this.gameObject, 'skewYDeg', -90, 90);

        this.debugGraphics = this.add.graphics();
        this.gameObject.setDebug(this.debugGraphics);
    }

    update() {
        this.debugGraphics
            .clear()
            .lineStyle(2, 0xff0000)
            .fillStyle(0x00ff00)

        var width = this.gameObject.displayWidth,
            height = this.gameObject.displayHeight,
            x = this.gameObject.x - (this.gameObject.originX * width),
            y = this.gameObject.y - (this.gameObject.originY * width);
        this.debugGraphics
            .strokeRect(x, y, width, height)
            .fillPoint(400, 400, 30)
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