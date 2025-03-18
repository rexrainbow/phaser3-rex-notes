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
        var image = this.add.image(0, 0, 'classroom')

        var maskGameObject = this.add.circle(0, 0, 300, 0x330000)
            .setVisible(false);
        image.enableFilters()
            .filters.external.addMask(maskGameObject);

        var container = this.add.container(400, 300, [image, maskGameObject])
            // .setSize(image.width, image.height);

        var renderTexture = this.add.renderTexture(0, 0, image.width, image.height)
            .setOrigin(0)
            .draw(container)
            .render()

        image.destroy()

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