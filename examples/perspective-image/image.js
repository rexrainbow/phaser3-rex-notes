import phaser from '../../../phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('poker', 'assets/images/poker/poker.png', 'assets/images/poker/poker.json');

        this.load.image('card', 'assets/images/card.jpg');
        this.load.image('card2', 'assets/images/card2.png');
    }

    create() {
        var frameIdx = 0;
        this.add.image(100, 300, 'poker', 'diamonds-1').setScale(1.5);
        var image = this.add.rexPerspectiveImage(100, 300, 'poker', 'diamonds-1').setScale(1.5).setAlpha(0.8)
            .setInteractive()
            .on('pointerdown', function () {
                frameIdx = (frameIdx + 1) % 13;
                image.setTexture('poker', `diamonds-${frameIdx + 1}`)
            })

        this.add.image(300, 300, 'card').setScale(0.5);
        var image2 = this.add.rexPerspectiveImage(300, 300, 'card', null).setAlpha(0.8).setScale(0.5);

        this.add.image(500, 300, 'card2').setScale(0.5);
        var image3 = this.add.rexPerspectiveImage(500, 300, 'card2', null).setAlpha(0.8).setScale(0.5);

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        var GetStateString = function (image) {
            return `angleY=${Math.floor(image.angleY)}`
        }


        var print = this.add.text(0, 0, GetStateString(image));
        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            image.rotationY += pointer.velocity.x * (1 / 800);
            print.setText(GetStateString(image));

            image2.rotationY = image.rotationY;
            image3.rotationY = image.rotationY;

            image3.tint = (image3.isBackFace) ? 0x888888 : 0xffffff;
        });
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
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);