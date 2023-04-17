import phaser from 'phaser/src/phaser.js';
import AutoRemoveTween from '../../plugins/utils/tween/AutoRemoveTween.js';

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

        var tween = AutoRemoveTween(sprite, {
            scale: 0.5,
            ease: 'Sine.easeInOut',
            duration: 1000,
            repeat: -1,
            yoyo: true
        })

        sprite
            .setInteractive()
            .on('pointerdown', function () {
                sprite.destroy();
            })

        this.print = this.add.text(0, 0, '');
    }

    update() {
        this.print.text = this.tweens.tweens.length;
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