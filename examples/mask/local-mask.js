import phaser from '../../../phaser/src/phaser.js';

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
        var image = this.add.image(600, 300, 'classroom')
            .setScale(0.5)
        var maskGameObject = this.add.circle(0, 0, 300, 0x330000)
        //.setVisible(false);

        image.enableFilters()
            .filters.internal.addMask(maskGameObject);

        this.add.graphics()
            .lineStyle(2, 0xff0000)
            .strokeRectShape(image.getBounds())

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