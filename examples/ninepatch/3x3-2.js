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
        this.add.rexNinePatch({
            x: 200, y: 200,
            width: 250, height: 200,
            key: 'bg2',
            leftWidth: 20,
            rightWidth: 20,
            topHeight: 20,
            bottomHeight: 20
        })

        this.add.rexNinePatch({
            x: 600, y: 200,
            width: 250, height: 200,
        })
            .setBaseTexture('bg2', undefined, 20, 20, 20, 20)
    }

    update() {
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
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);