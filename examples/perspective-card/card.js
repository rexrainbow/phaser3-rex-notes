import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card', 'assets/images/card2.png');
        this.load.image('card-back', 'assets/images/card2-back.png');
    }

    create() {
        var card0 = CreateCard(this, 200, 300, 'card');
        var card1 = CreateCard(this, 400, 300, 'card');
        var card2 = CreateCard(this, 600, 300, 'card');
    }

    update() {
    }
}

var CreateCard = function (scene, x, y, frontFace) {
    return scene.add.rexPerspectiveCard({
        x: x, y: y,
        front: { key: frontFace },
        back: { key: 'card-back' },
        face: 'back',

        flip: {
            frontToBack: 'right',
            backToFront: 'left',
            duration: 1000,
            ease: 'Cubic'
        }
    })
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', function (pointer, localX, localY) {
            if (localX <= (this.width / 2)) {
                this.flip.flipLeft();
            } else {
                this.flip.flipRight();
            }
            // this.flip.flip();
        })
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
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);