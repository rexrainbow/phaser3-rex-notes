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
        var rect = this.add.rexQuadShape({
            x: 400, y: 450,
            width: 500, height: 200,
            color: 0x888888,

            tlx: 50,
            trx: 40, try: -30,
        })
            .setBottomSidePoint(0.25, 0, -30)
            .setBottomSidePoint(0.75, 0, -30)
            .setLeftSidePoint(0.75, -40, 0)
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