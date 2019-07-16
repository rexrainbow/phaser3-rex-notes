import EaseSine from '../../plugins/utils/math/ease/Sine.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var gameObject = this.add.circle(400, 200, 15, 0xff0000);
        this.tweens.add({
            targets: gameObject,
            y: 400,
            ease: EaseSine,
            duration: 1000,
            repeat: -1,
            yoyo: true
        });

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