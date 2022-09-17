import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.add.rectangle(400, 300, 100, 100, 0xffffff)
            .setInteractive()
            .on('pointerdown', function () {
                console.log('pointerdown')
            })
            .on('pointerup', function () {
                console.log('pointerup')
            })
            .on('pointerover', function () {
                console.log('pointerover')
            })
            .on('pointerout', function () {
                console.log('pointerout')
            })

            // pointerdown, pointerover
            // pointerover, pointerdown
    }

    update(time, delta) {
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
    scene: Demo
};

var game = new Phaser.Game(config);