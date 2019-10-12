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
        CreateTexture5x5(this, '5x5');
        this.add.image(0, 0, '5x5').setOrigin(0);
        this.add.rexNinePatch({
            x: 200, y: 300,
            width: 250, height: 200,
            key: '5x5',
            columns: [20, 10, 20, 10, 20],
            rows: [20, 10, 20, 10, 20],
        })

        CreateTexture5x3(this, '5x3');
        this.add.image(500, 0, '5x3').setOrigin(0);
        this.add.rexNinePatch({
            x: 600, y: 300,
            width: 250, height: 200,
            key: '5x3',
            columns: [20, 10, 20, 10, 20],
            rows: [20, 10, 20],
        })
    }

    update() {
    }
}

const COLOR_PRIMARY = 0x9575cd;
const COLOR_LIGHT = 0xc7a4ff;
const COLOR_DARK = 0x65499c;
var CreateTexture5x5 = function (scene, key) {
    // width: 20-10-20-10-20
    // height: 20-10-20-10-20
    var width = 80, height = 80;
    scene.add.graphics()
        .lineStyle(3, COLOR_DARK)
        .strokeRect(1, 1, width - 10, height - 10)
        .strokeRect(9, 9, width - 10, height - 10)
        .fillStyle(COLOR_PRIMARY)
        .fillTriangle(30, 0, 50, 0, 40, 20)
        .fillTriangle(30, 80, 50, 80, 40, 60)
        .fillTriangle(0, 30, 0, 50, 20, 40)
        .fillTriangle(80, 30, 80, 50, 60, 40)
        .generateTexture(key, width, height)
        .destroy();
}

var CreateTexture5x3 = function (scene, key) {
    // width: 20-10-20-10-20
    // height: 20-10-20
    var width = 80, height = 50;
    scene.add.graphics()
        .lineStyle(3, COLOR_DARK)
        .strokeRect(1, 1, width - 10, height - 10)
        .strokeRect(9, 9, width - 10, height - 10)
        .fillStyle(COLOR_PRIMARY)
        .fillTriangle(30, 0, 50, 0, 40, 20)
        .fillTriangle(30, 50, 50, 50, 40, 30)
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