import { GrayScalePostFxPipeline as rexGrayScalePostFx } from '../../plugins/grayscalepipeline'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        const Between = Phaser.Math.Between;
        for (var i = 0; i < 20; i++) {
            let gameObject = this.add.circle(0, 0, 30, Between(0, 0x1000000))
                .setRandomPosition(100, 100, 600, 400)

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    // Add postfx pipeline
                    gameObject.setPostPipeline('rexGrayScalePostFx');
                })
                .on('pointerout', function () {
                    // Remove postfx pipeline
                    gameObject.resetPostPipeline();
                })
        }
    }

    update() {
    }
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
    pipeline: { rexGrayScalePostFx }
};

var game = new Phaser.Game(config);