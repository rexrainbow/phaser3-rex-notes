import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.script('live2d', 'assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
    }

    create() {
        console.log('Create stage');

        this.add.text(0, 0, 'Text0');

        var x = 500;
        var y = 500;

        var obj = this.add.rexLive2d(x, y, 'Haru')
            .setScale(0.2)
            .setOrigin(0.5)

        this.add.text(0, 1060, 'Text1')

        this.add.graphics({
            lineStyle: {
                color: 0xffff00,
                width: 10
            }
        })
            .strokeRectShape(obj.getBounds())

        this.add.circle(x, y, 10, 0xff0000);

        //this.cameras.main.setZoom(0.3)
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexLive2d',
                plugin: Live2dPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);