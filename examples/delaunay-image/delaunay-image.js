import phaser from '../../../phaser/src/phaser.js';
import DelaunayImagePlugin from '../../plugins/delaunayimage-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var image = this.add.rexDelaunayImage(400, 300, '__WHITE')
            .reTriangulate({ triangleCount: 30 })
            .setDisplaySize(400, 400)
            .setTint(0x888888)

        this.debug = this.add.graphics();
        image.setDebug(this.debug);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0xff0000);
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
    backgroundColor: 0x333333,
    plugins: {
        global: [{
            key: 'rexDelaunayImage',
            plugin: DelaunayImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);