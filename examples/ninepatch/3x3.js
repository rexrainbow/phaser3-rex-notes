import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateTexture(this, 'bg');
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.rexNinePatch({
            x: 400, y: 300,
            width: 250, height: 200,
            key: 'bg',
            columns: [20, 10, 20],
            rows: [20, 10, 20],
        })
    }

    update() {
    }
}

const COLOR_PRIMARY = 0x9575cd;
const COLOR_LIGHT = 0xc7a4ff;
const COLOR_DARK = 0x65499c;
var CreateTexture = function (scene, key) {
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
        global: [{
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);