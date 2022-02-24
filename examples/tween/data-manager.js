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
        var txt = this.add.text(400, 300, '').setOrigin(0.5)
            .setData('t', 0)
            .on('changedata-t', function (parent, value, previousValue) {
                parent.setText(`${Math.floor(value * 100)}%`);
            })

        var EaseTo = function (txt, newT) {
            var scene = txt.scene;
            scene.tweens.add({
                targets: txt.data.values,
                t: newT,
                ease: 'Linear',
                duration: 3000,
                repeat: 0,
                yoyo: false
            });
        }

        EaseTo(txt, 1);
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