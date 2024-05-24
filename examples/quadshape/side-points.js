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
            .insertBottomSidePoint(0.5, 0, 0, 'buttonPoint0')
            .insertBottomSidePoint(0.5, 0, 0, 'buttonPoint1')
            .insertLeftSidePoint(0.75, 0, 0, 'leftPoint')

        this.tweens.add({
            targets: rect,

            leftPointX: -40,

            buttonPoint0Y: -30,
            buttonPoint0T: 0.25,

            buttonPoint1Y: -30,
            buttonPoint1T: 0.75,

            duration: 2000
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
            key: 'rexQuadShape',
            plugin: QuadShapePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);