import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card', 'assets/images/card.jpg');
    }

    create() {
        this.add.image(400, 300, 'card').setScale(0.5).setAngle(45);
        var image = this.add.rexPerspectiveImage(400, 300, 'card', null, { hideCCW: false }).setScale(0.5).setAngle(45);

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            image.rotationY += pointer.velocity.x * (1 / 800);
        });

        this.cameras.main.setScroll(200, -100)
    }

    update() {
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
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);