import phaser from 'phaser/src/phaser.js';
import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'assets/images/ninepatch/stretch-edge.png');
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0)

        this.add.rexNinePatch({
            x: 200, y: 430,
            width: 250, height: 200,
            key: 'bg',
            columns: [16, undefined, 16],
            rows: [16, undefined, 16],
            stretchMode: {
                edge: 'repeat', // 'scale', or 1, 'repeat'
                internal: 'scale', // 'scale', or 1, 'repeat'
            }
        })
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