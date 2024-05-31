import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        this.scale.on('orientationchange', function (orientation) {
            if (orientation === Phaser.Scale.PORTRAIT) {
                print.text = 'PORTRAIT'
            } else if (orientation === Phaser.Scale.LANDSCAPE) {
                print.text = 'LANDSCAPE'
            }
        });

        print.text = this.scale.orientation;

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