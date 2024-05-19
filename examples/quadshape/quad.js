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
        var rect = this.add.rexQuadShape(400, 450, 500, 200, 0x888888);

        rect.tlx = 50;
        rect.setTRPosition(40, -30);

        var rect = this.add.rexQuadShape(400, 200, 500, 200, 0x888888);

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