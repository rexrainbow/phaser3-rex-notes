import 'phaser';
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
        CreateTexture0(this, 'bg0');
        this.add.image(0, 0, 'bg0').setOrigin(0);
        var ninePatch = this.add.rexNinePatch({
            x: 400, y: 300,
            width: 100, height: 50,
            key: 'bg0',
            columns: [20, undefined, 20],
            rows: [100, undefined, 100],
            preserveRatio: true
        })
        this.add.rectangle(400, 300, 100, 50).setStrokeStyle(1, 0xff0000)

        console.log(`${ninePatch.fixedPartScaleX} x ${ninePatch.fixedPartScaleY}`)

    }

    update() {
    }
}

const COLOR_PRIMARY = 0x9575cd;
const COLOR_LIGHT = 0xc7a4ff;
const COLOR_DARK = 0x65499c;
var CreateTexture0 = function (scene, key) {
    // width: 20-0-20
    // height: 100-0-100
    var width = 40, height = 200;
    scene.add.graphics()
        .fillStyle(COLOR_PRIMARY)
        .fillEllipse(width / 2, height / 2, width, height)
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