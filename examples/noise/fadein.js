import Phaser from '../../node_modules/phaser/src/phaser.js';

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

        var noise = new Noise(this, 400, 300, 800, 600);

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

const MinNoisePower = 0.01;
const MaxNoisePower = 100;
class Noise extends Phaser.GameObjects.Noise {
    constructor(scene, x, y, width, height, noisePowerTransformMode = 0) {
        var config = {
            noiseColorStart: new Phaser.Display.Color(0, 0, 0, 0),
            noiseColorEnd: new Phaser.Display.Color(255, 255, 255, 255)
        };
        super(scene, config, x, y, width, height);

        this.noisePowerTransformMode = noisePowerTransformMode;
    }
    get noisePowerT() {
        return this._t;
    }

    set noisePowerT(value) {
        this._t = value;

        switch (this.noisePowerTransformMode) {
            case 0: this.noisePower = FromMeanOpacity(value); break;
            case 1: this.noisePower = FromWhitePointCoverage(value); break;
            default: this.noisePower = LogInterpolateNoisePower(value); break;
        }
    }
}

var LogInterpolateNoisePower = function (t) {
    return Math.exp(
        Math.log(MaxNoisePower) * (1 - t) +
        Math.log(MinNoisePower) * t
    );
}

var FromWhitePointCoverage = function (t) {
    const threshold = 0.9;
    var coverage = Phaser.Math.Clamp(t, 0.001, 0.999);
    return Math.log(threshold) / Math.log(1 - coverage);
}

var FromMeanOpacity = function (t) {
    var brightness = Phaser.Math.Clamp(t, 0.001, 0.999);
    return (1 / brightness) - 1;
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
