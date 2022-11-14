import phaser from 'phaser/src/phaser.js';
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

        this.add.rexCircleMaskImage(100, 200, 'image');

        //this.add.rexCircleMaskImage(300, 200, 'image', {
        //    maskType: 'ellipse'
        //});

        //this.add.rexCircleMaskImage(500, 200, 'image', {
        //    maskType: 'roundRectangle',
        //    radius: 20
        //});

        // this.add.rexCircleMaskImage(700, 200, 'image', {            
        //     strokeColor: 'red'
        // });

        this.add.rexCircleMaskImage(100, 400, 'image', {            
            backgroundColor: 'yellow'
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