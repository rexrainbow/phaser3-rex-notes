import phaser from '../../../phaser/src/phaser.js';
import NinePatchPlugin from '../../plugins/ninepatch2-plugin.js'

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
        CreateTexture0(this, 'bg0');
        this.add.image(0, 0, 'bg0').setOrigin(0);
        this.add.rexNinePatch2({
            x: 200, y: 200,
            width: 250, height: 200,
            key: 'bg0',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })
            .setTint(0xff0000)

        CreateTexture1(this, 'bg1');
        this.add.image(400, 0, 'bg1').setOrigin(0);
        this.add.rexNinePatch2({
            x: 600, y: 200,
            width: 250, height: 200,
            key: 'bg1',
            columns: [10, 10, 10],
            rows: [10, 10, 10],
            stretchMode: {
                edge: 'repeat',
                internal: 'scale'
            }
        })

        this.add.rexNinePatch2({
            x: 200, y: 430,
            width: 250, height: 200,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })

        this.add.rexNinePatch2({
            x: 600, y: 430,
            width: 30, height: 30,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })
        this.add.rectangle(600, 430, 30, 30).setStrokeStyle(2, 0xff0000)
    }

    update() {
    }
}

const COLOR_MAIN = 0xbdbdbd;
const COLOR_LIGHT = 0xefefef;
const COLOR_DARK = 0x8d8d8d;
var CreateTexture0 = function (scene, key) {
    // width: 20-10-20
    // height: 20-10-20
    var width = 50, height = 50;
    scene.add.graphics()
        .fillStyle(COLOR_MAIN)
        .fillTriangle(0, 0, 0, 20, 20, 0)
        .fillTriangle(width, height, width, height - 20, width - 20, height)
        .lineStyle(3, COLOR_DARK)
        .strokeRect(1, 1, width - 10, height - 10)
        .strokeRect(9, 9, width - 10, height - 10)
        .generateTexture(key, width, height)
        .destroy();
}

var CreateTexture1 = function (scene, key) {
    // width: 10-10-10
    // height: 10-10-10
    var width = 30, height = 30;
    scene.add.graphics()
        .fillStyle(COLOR_MAIN)
        .fillRect(0, 0, 10, 10)
        .fillRect(width - 10, 0, 10, 10)
        .fillRect(0, height - 10, 10, 10)
        .fillRect(width - 10, height - 10, 10, 10)
        .fillCircle(15, 5, 4)
        .fillCircle(5, 15, 4)
        .fillCircle(15, 25, 4)
        .fillCircle(25, 15, 4)
        .generateTexture(key, width, height)
        .destroy();
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
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);