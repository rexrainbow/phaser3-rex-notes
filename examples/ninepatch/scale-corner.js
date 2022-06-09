import phaser from 'phaser/src/phaser.js';
import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'

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
        this.add.rexNinePatch({
            x: 400, y: 300,
            width: 480, height: 80,
            key: 'bg0',
            columns: [
                { width: 80, stretch: 1 },
                { width: 80, stretch: 0 },
                { width: 80, stretch: 1 },
            ],
            rows: [
                { height: 80, stretch: 1 }
            ],
        })

    }

    update() {
    }
}

var CreateTexture0 = function (scene, key) {
    // width: 80-80-80
    // height: 80
    var width = 240, height = 80;
    scene.add.graphics()
        .fillStyle(0x7e57c2)
        .fillCircle(40, 40, 40)
        .fillStyle(0xb085f5)
        .fillCircle(120, 40, 40)
        .fillStyle(0x7e57c2)
        .fillCircle(200, 40, 40)
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