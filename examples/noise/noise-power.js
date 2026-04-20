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

        var noise = new Noise(this, {}, 400, 300, 800, 600);

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
    constructor(scene, config, x, y, width, height) {
        if (config === undefined) {
            config = {};
        }
        config.noiseColorStart = new Phaser.Display.Color(0, 0, 0, 0);

        super(scene, config, x, y, width, height);
    }
    get noisePowerT() {
        return this._t;
    }

    set noisePowerT(value) {
        this._t = value;
        this.noisePower = Math.exp(
            Math.log(MaxNoisePower) * (1 - value) +
            Math.log(MinNoisePower) * value
        );
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