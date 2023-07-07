import phaser from 'phaser/src/phaser.js';
import AddGrayscaleProperties from '../../plugins/behaviors/effects/AddGrayScaleProperties.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        var image = this.add.image(400, 300, 'logo').setScale(0.75);
        AddGrayscaleProperties(image)

        image.grayscale = 1;
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
};

var game = new Phaser.Game(config);