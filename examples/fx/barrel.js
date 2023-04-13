import phaser from 'phaser/src/phaser.js';

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
        var gameObject0 = this.add.image(300, 300, 'mushroom');
        gameObject0.preFX.addBarrel(0.5);

        var gameObject1 = this.add.image(400, 300, 'mushroom');
        gameObject1.postFX.addBarrel(0.5);

        var gameObject2 = this.add.image(500, 300, 'mushroom');

        this.add.renderTexture(0, 0, 800, 600)
            .setOrigin(0)
            .draw([gameObject0, gameObject1, gameObject2])
            .setY(100)

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