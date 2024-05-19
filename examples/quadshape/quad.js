import phaser from 'phaser/src/phaser.js';
import QuadShapePlugin from '../../plugins/quadshape-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var rect = this.add.rexQuadShape(400, 400, 500, 200, 0x333333);
        this.add.existing(rect);

        rect.tlx = 50;
        rect.setTRPosition(40, -30);
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
            key: 'rexQuadShape',
            plugin: QuadShapePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);