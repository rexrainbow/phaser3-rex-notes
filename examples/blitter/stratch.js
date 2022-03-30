import phaser from 'phaser/src/phaser.js';
import BlitterPlugin from '../../plugins/blitter-plugin.js';
import NinePatchPlugin from '../../plugins/ninepatch-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg2', 'assets/images/ninepatch/nine-patch.png');
    }

    create() {
        // this.add.image(0, 0, 'bg2').setOrigin(0);

        this.add.rexNinePatch({
            x: 200, y: 300,
            width: 250, height: 200,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })
            .setAngle(-45)
            .setCrop(20, 20, 210, 160)

        var blitter = this.add.rexBlitter(550, 300, 'bg2')
            .setSize(250, 200)
            .setOrigin(0.5)
            .setAngle(-45)
            .setCrop(20, 20, 210, 160)
            .addImage({
                frame: '0,0',
                x: 0, y: 0,
                width: 20, height: 20,
            })
            .addImage({
                frame: '1,0',
                x: 20, y: 0,
                width: 210, height: 20,
            })
            .addImage({
                frame: '2,0',
                x: 230, y: 0,
                width: 20, height: 20,
            })
            .addImage({
                frame: '0,1',
                x: 0, y: 20,
                width: 20, height: 160,
            })
            .addImage({
                frame: '1,1',
                x: 20, y: 20,
                width: 210, height: 160,
            })
            .addImage({
                frame: '2,1',
                x: 230, y: 20,
                width: 20, height: 160,
            })
            .addImage({
                frame: '0,2',
                x: 0, y: 180,
                width: 20, height: 20,
            })
            .addImage({
                frame: '1,2',
                x: 20, y: 180,
                width: 210, height: 20,
            })
            .addImage({
                frame: '2,2',
                x: 230, y: 180,
                width: 20, height: 20,
            })
    }

    update(time) { }
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
        global: [
            {
                key: 'rexBlitter',
                plugin: BlitterPlugin,
                start: true
            },
            {
                key: 'rexNinePatch',
                plugin: NinePatchPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);