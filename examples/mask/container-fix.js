import phaser from 'phaser/src/phaser.js';

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
        var containerImage = this.add.container(0, 0, [image])
        var maskGameObject = this.make.graphics().setVisible(false);
        var mask = maskGameObject.createGeometryMask();

        maskGameObject
            .fillStyle(0x330000)
            .fillRect(-200, -200, 400, 400)
            .setScale(0.5)

        containerImage.setMask(mask);

        var container = this.add.container(400, 300, [containerImage, maskGameObject]);

        container.preUpdate = function (time, delta) {
            // Force position of maskGameObject to world position, 
            // not related position based on container.
            mask.geometryMask.x = containerImage.localTransform.tx;
            mask.geometryMask.y = containerImage.localTransform.ty;
            console.log(maskGameObject.x)
        }

        this.add.existing(container);

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