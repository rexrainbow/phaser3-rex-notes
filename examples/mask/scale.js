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
        var image = this.add.image(400, 300, 'classroom')
            .setScale(0.5)
        var maskGameObject = this.make.graphics({ x: 400, y: 300 });
        image.setMask(maskGameObject.createGeometryMask());

        maskGameObject
            .fillStyle(0x330000)
            .fillRect(-200, -200, 400, 400)
            .setScale(0.5)

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