import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

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
        var x = 1920 / 2;
        var y = 1080 / 2;

        this.character = this.add.rexLive2d(x, y, 'Haru')
            .setScale(0.5)
            .startMotion('TapBody', undefined, 'force')
            .on('motions.complete', function () {
                this.startMotion('TapBody', undefined, 'force')
            })


        var gui = new Dat.GUI();
        gui.add(this.character, 'x', 0, 1920);
        gui.add(this.character, 'y', 0, 1080);
        gui.add(this.character, 'scale', 0.1, 1);
        gui.add(this.character, 'angle', -180, 180);
        gui.add(this.character, 'originX', 0, 1);
        gui.add(this.character, 'originY', 0, 1);

        // this.boundsGraphics = this.add.graphics({
        //     lineStyle: {
        //         color: 0xffff00,
        //         width: 3
        //     }
        // })

    }

    update() {
        // this.boundsGraphics
        //     .clear()
        //     .strokeRectShape(this.character.getBounds())
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