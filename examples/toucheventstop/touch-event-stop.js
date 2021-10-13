import 'phaser';
import TouchEventStop from '../../plugins/input/toucheventstop/TouchEventStop.js';

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
        this.input.topOnly = false;

        this.add.image(400, 300, 'classroom')
            .setInteractive()
            .on('pointerdown', function () {
                console.log('Img pointer-down')
            })
            .on('pointerover', function () {
                console.log('Img pointer-over')
            })

        var cover = this.add.zone(400, 300, 800, 600)
        var touchEventStop = new TouchEventStop(cover);
    }

    update(time, delta) {
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