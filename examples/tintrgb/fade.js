import 'phaser';
import TintRGBPlugin from '../../plugins/tintrgb-plugin.js';

const Between = Phaser.Math.Between;

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
        var sprite = this.add.image(0, 0, 'classroom').setOrigin(0);
        this.plugins.get('rexTintRGB').add(sprite);
        this.tweens.add({
            targets: sprite,
            // tintR: 0,
            // tintG: 0,
            // tintB: 0,
            tintGray: 0,
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
            key: 'rexTintRGB',
            plugin: TintRGBPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);