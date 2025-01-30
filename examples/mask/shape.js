import phaser from '../../../phaser/src/phaser.js';
import { AddMask, RemoveMask } from '../../plugins/utils/mask/MaskMethods.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var image = this.add.image(400, 300, 'classroom')
            .setScale(0.5)
        var maskGameObject = this.add.circle(400, 300, 200, 0x330000)
            .setScale(0.5).setVisible(false);

        this.input
            .on('pointerdown', function () {
                AddMask(image, maskGameObject);
            })
            .on('pointerup', function () {
                RemoveMask(image);
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
    scene: Demo
};

var game = new Phaser.Game(config);