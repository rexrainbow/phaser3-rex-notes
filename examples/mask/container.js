import 'phaser';

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
        var image = this.add.image(0, 0, 'classroom')
            .setScale(0.5)
        var maskGameObject = this.make.graphics();
        var mask = maskGameObject.createGeometryMask();

        maskGameObject
            .fillStyle(0x330000)
            .fillRect(-200, -200, 400, 400)
            .setScale(0.5)

        image.setMask(mask);

        var container = this.add.container(400, 300, [image, maskGameObject]);

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