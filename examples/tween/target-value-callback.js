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
            y: function (target, key, value, targetIndex, totalTargets, tween) {
                var newValue = target.y + Math.random() * 100;
                console.log(newValue)
                return newValue;
            },

            yoyo: true,
            repeat: -1
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