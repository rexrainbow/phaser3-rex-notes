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
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        CreateTexture0(this, 'bg0');
        this.add.image(0, 0, 'bg0').setOrigin(0);
        this.add.rexNinePatch({
            x: 200, y: 200,
            width: 250, height: 200,
            key: 'bg0',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })
            .setAngle(-45)

        var blitter = this.add.rexBlitter(550, 200, 'bg0')
            .setSize(250, 200)
            .setOrigin(0.5)
            .setAngle(-45)
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

const COLOR_PRIMARY = 0x9575cd;
const COLOR_LIGHT = 0xc7a4ff;
const COLOR_DARK = 0x65499c
var CreateTexture0 = function (scene, key) {
    // width: 20-10-20
    // height: 20-10-20
    var width = 50, height = 50;
    scene.add.graphics()
        .fillStyle(COLOR_PRIMARY)
        .fillTriangle(0, 0, 0, 20, 20, 0)
        .fillTriangle(width, height, width, height - 20, width - 20, height)
        .lineStyle(3, COLOR_DARK)
        .strokeRect(1, 1, width - 10, height - 10)
        .strokeRect(9, 9, width - 10, height - 10)
        .generateTexture(key, width, height)
        .destroy();
}

var config = {
    type: Phaser.CANVAS,
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