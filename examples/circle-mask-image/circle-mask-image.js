import 'phaser';
import CircleMaskImagePlugin from '../../plugins/circlemaskimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('image', 'assets/images/rectangle128x96.jpg');
    }

    create() {
        this.add.image(0, 0, 'image').setOrigin(0);
        
        this.add.rexCircleMaskImage(200, 300, 'image');

        this.add.rexCircleMaskImage(400, 300, 'image', {
            maskType: 'ellipse'
        });

        this.add.rexCircleMaskImage(600, 300, 'image', {
            maskType: 'roundRectangle',
            radius: 20
        });
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCircleMaskImage',
            plugin: CircleMaskImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);