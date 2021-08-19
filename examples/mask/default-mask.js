import 'phaser';
import DefaultMask from '../../plugins/utils/mask/DefaultMask.js';
import ContainerLite from '../../plugins/gameobjects/containerlite/ContainerLite.js';

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
        var image = this.add.image(400, 300, 'classroom');
        var maskGameObject = new DefaultMask(image, 1);
        image.setMask(maskGameObject.createGeometryMask());

        var container = new ContainerLite(this, 400, 300, image.width, image.height, [image, maskGameObject]);
        this.add.existing(container);

        // Test scale
        container.setScale(0.5);

        // Test origin
        container.setOrigin(0);
        image.setOrigin(0);
        maskGameObject.setOrigin(0);
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