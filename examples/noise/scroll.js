import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var noise = new Noise(this, {}, 400, 300, 300, 300);
        this.add.existing(noise);

        this.tweens.add({
            targets: noise,
            noiseOffsetX: 1,
            noiseOffsetY: 0.5,
            duration: 5000,
            repeat: -1,
        });

    }

    update() { }
}

class Noise extends Phaser.GameObjects.Noise {
    get noiseOffsetX() {
        return this.noiseOffset[0];
    }

    set noiseOffsetX(value) {
        this.noiseOffset[0] = value;
    }

    get noiseOffsetY() {
        return this.noiseOffset[1];
    }

    set noiseOffsetY(value) {
        this.noiseOffset[1] = value
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
