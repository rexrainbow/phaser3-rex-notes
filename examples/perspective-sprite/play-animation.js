import phaser from '../../../phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

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

        var sprite0 = this.add.sprite(200, 300, 'knight').setScale(2)

        var sprite = this.add.rexPerspectiveImage(400, 300, 'knight', null, { hideCCW: false }).setScale(2)

        this.add.text(0, 400, 'Play animation')
            .setInteractive()
            .on('pointerdown', function () {
                sprite0.play('idle');
                sprite.play('idle');
            })

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            sprite.rotationY += pointer.velocity.x * (1 / 800);
        });

        this.debug = this.add.graphics();
        sprite.setDebug(this.debug);

    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
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
    // pixelArt: true,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);