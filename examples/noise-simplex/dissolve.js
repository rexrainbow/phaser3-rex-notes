import Phaser from 'phaser';

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
            dissolveT: { from: 0, to: 1 },
            duration: 2000,

            onComplete() {
                image.filters.external.remove(maskObject);
            }
        });

    }

    update() { }
}

class Noise extends Phaser.GameObjects.NoiseSimplex2D {
    constructor(scene, x, y, width, height) {
        var config = {
            noiseCells: [4, 4],
            noiseIterations: 1,
            noiseWarpIterations: 2,
            noiseWarpAmount: 1.5,
            noiseValueFactor: 4,
            noiseValueAdd: -4,
            noiseValuePower: 1,
            noiseColorStart: new Phaser.Display.Color(0, 0, 0, 0),
            noiseColorEnd: new Phaser.Display.Color(255, 255, 255, 255)
        };
        super(scene, config, x, y, width, height);

        this.dissolveT = 0;
    }

    get dissolveT() {
        return this._dissolveT;
    }

    set dissolveT(value) {
        this._dissolveT = value;

        var edgeSharpness = this.noiseValueFactor;

        this.noiseValueAdd = Phaser.Math.Linear(-edgeSharpness, 1 + edgeSharpness, value);
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
