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
            var s = [orientation];
            if (orientation === Phaser.Scale.PORTRAIT) {
                s.push('PORTRAIT')
            } else if (orientation === Phaser.Scale.LANDSCAPE) {
                s.push('LANDSCAPE')
            } else {
                s.push('??')
            }

            print.text = s.join('\n')
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