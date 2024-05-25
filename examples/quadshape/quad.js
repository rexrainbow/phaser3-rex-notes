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
            strokeColor: 0xff0000,
            tlx: 50,
            trx: 40, try: -30
        });

        var rect = this.add.rexQuadShape(400, 200, 500, 200, 0x888888).setStrokeStyle(2, 0xff0000);
        this.tweens.add({
            targets: rect,
            tlx: 50,
            trx: 40,
            try: -30
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