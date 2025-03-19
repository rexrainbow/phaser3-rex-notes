import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var image = this.add.image(0, 0, 'mushroom');
        var container = this.add.container(400, 300, [image])

        var renderTexture = this.add.renderTexture(400, 300, 800, 600)
            .capture(image, { transform: 'world', camera: this.cameras.main })
            .render()

        container.destroy()

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