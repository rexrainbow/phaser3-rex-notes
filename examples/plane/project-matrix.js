import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card', 'assets/images/card2.png');
    }

    create() {
        var card = this.add.plane(400, 300, 'card').setScale(0.7)
        // var card = this.add.rexPerspectiveImage(400, 300, 'card', null, { hideCCW: false }).setScale(0.7);
        card.projectionMatrix
            .translateXYZ(0, 2, 0)
            .rotateX(Phaser.Math.DegToRad(-45));
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
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);