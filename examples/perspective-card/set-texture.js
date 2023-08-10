import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('poker', 'assets/images/poker2/poker.png', 'assets/images/poker2/poker.json');
    }

    create() {
        var card0 = CreateCard(this, 200, 300);
        var card1 = CreateCard(this, 400, 300);
        var card2 = CreateCard(this, 600, 300);

        this.add.text(150, 580, 'Reset frame')        
            .setInteractive()
            .on('pointerdown', function () {
                card0.frontFace.setTexture('poker', GetRandomFrameName());
            })

        this.add.text(350, 580, 'Reset frame')
            .setInteractive()
            .on('pointerdown', function () {
                card1.frontFace.setTexture('poker', GetRandomFrameName());
            })

        this.add.text(550, 580, 'Reset frame')
            .setInteractive()
            .on('pointerdown', function () {
                card2.frontFace.setTexture('poker', GetRandomFrameName());
            })
    }

    update() {
    }
}

var CreateCard = function (scene, x, y) {
    return scene.add.rexPerspectiveCard({
        x: x, y: y,
        front: { key: 'poker', frame: GetRandomFrameName() },
        back: { key: 'poker', frame: 'back' },
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

var GetRandomFrameName = function () {
    var index = Phaser.Math.Between(0, 52);
    return Phaser.Utils.String.Pad(index.toString(), 3, '0', 1);
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