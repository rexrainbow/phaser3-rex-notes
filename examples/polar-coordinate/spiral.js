import phaser from 'phaser/src/phaser.js';
import PolarCoordinatePlugin from '../../plugins/polarcoordinate-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var sprite = this.add.rectangle(0, 0, 30, 30).setStrokeStyle(2, 0xff0000);
        this.plugins.get('rexPolarCoordinate').add(sprite, 400, 300);
        this.tweens.add({
            targets: sprite,
            polarAngle: 360 * 3,
            polarRadius: 250,
            duration: 3000
        })
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexPolarCoordinate',
            plugin: PolarCoordinatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);