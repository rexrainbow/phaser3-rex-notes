import Cube from '../../plugins/gameobjects/perspective/cube/Cube';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card', 'assets/images/card2.png');
        this.load.image('card-back', 'assets/images/card2-back.png');
    }

    create() {
        var cube = new Cube(this, {
            x: 400, y: 300,
            width: 200, height: 200,

            back: CreateRenderTexture(this, 200, 200, 0x00ff00, 0.5).setName('back'),
            front: CreateRenderTexture(this, 200, 200, 0xff0000, 0.5).setName('front'),
            left: CreateRenderTexture(this, 200, 200, 0x0000ff, 0.5).setName('left'),
            right: CreateRenderTexture(this, 200, 200, 0xC4C400, 0.5).setName('right'),
        })

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            cube.rotationY += pointer.velocity.x * (1 / 800);
        });
    }

    update() {
    }
}

var CreateRenderTexture = function (scene, width, height, color, alpha) {
    return scene.add.rexPerspectiveRenderTexture(0, 0, width, height)
        .fill(color, alpha);
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