import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var image = this.add.image(400, 300, 'classroom');

        var noise = CreateNoise(this, 400, 300, 800, 600).setVisible(false);

        var maskObject = image
            .enableFilters()
            .filters.external.addMask(noise)

        this.tweens.add({
            targets: noise,
            noisePowerT: { from: 0, to: 1 },
            duration: 2000,

            onComplete() {
                image.filters.external.remove(maskObject);
            }
        });

    }

    update() { }
}

var CreateNoise = function (scene, x, y, width, height) {
    var noise = scene.add.noise({
        noiseColorStart: new Phaser.Display.Color(0, 0, 0, 0),

    }, x, y, width, height);
    noise.minNoisePower = 0.01;
    noise.maxNoisePower = 100;
    Object.defineProperty(noise, 'noisePowerT', {
        get() {
            return this._t;
        },
        set(value) {
            this._t = value;
            this.noisePower = Math.exp(
                Math.log(this.maxNoisePower) * (1 - value) +
                Math.log(this.minNoisePower) * value
            );
        },
        enumerable: true,
        configurable: true
    });

    return noise;
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