import 'phaser';
import TouchEventStopPlugin from '../../plugins/toucheventstop-plugin.js';

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

        var rect = this.add.rectangle(300, 300, 100, 200, 0x880000)
        this.plugins.get('rexTouchEventStop').add(rect, {
            // hitAreaMode: 1
        });
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexTouchEventStop',
            plugin: TouchEventStopPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);