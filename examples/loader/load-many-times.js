import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var key = 'classroom';
        for (var i = 0; i < 10; i++) {
            this.load.image(key, 'assets/images/backgrounds/classroom.png');
        }
        this.load.on(`filecomplete-image-${key}`, function () {
            console.log('load image complete')
            // Observation: The log is printed only once, with no repeated output.
        })

    }

    create() {
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