import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var sprite = this.add.rectangle(400, 400, 50, 100)
            .setStrokeStyle(2, 0xff0000)
            .setOrigin(0.5, 1)

        var tween = this.tweens.add({
            targets: sprite,
            angle: {
                value: { start: -30, to: 30, },
                ease: 'Sine.easeInOut',
                yoyo: true,
                duration: 500,
                repeat: -1
            },

            y: {
                value: { start: 300, to: 500 },
                ease: 'Cubic.easeInOut',
                yoyo: true,
                duration: 1000,
                repeat: -1
            }
        });
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo
};

var game = new Phaser.Game(config);