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
        // Load file in create stage
        this.load
            .image('mushroom', 'assets/images/mushroom.png')
            .once('complete', function () {
                this.add.image(350, 300, 'mushroom');
            }, this)
            .start();

        // Load file out of preload/create stage
        var scene = this;
        setTimeout(function () {
            scene.load
                .image('dude', 'assets/images/phaser-dude.png')
                .once('complete', function () {
                    scene.add.image(450, 300, 'dude');
                })
                .start();
        }, 500)
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