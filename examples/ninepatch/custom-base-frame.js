import 'phaser';
import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('atlas', 'assets/images/ninepatch/atlas.png', 'assets/images/ninepatch/atlas.json')
    }

    create() {
        this.add.image(100, 100, 'atlas', 'button_green_s_w_slice9');
        this.add.rexNinePatch({
            x: 400, y: 300,
            width: 300, height: 400,
            key: 'atlas',
            baseFrame: 'button_green_s_w_slice9',
            columns: [30, undefined, 30],
            rows: [30, undefined, 30]          
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