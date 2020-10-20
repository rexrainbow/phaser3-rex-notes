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
        var cube = this.add.rexPerspectiveCube({
            x: 400, y: 300,
            width: 200, height: 200,

            front: CreateRenderTexture(this, 200, 200, 0xC40000, '1'),
            back: CreateRenderTexture(this, 200, 200, 0x00C400, '2'),
            left: CreateRenderTexture(this, 200, 200, 0x0000C4, '3'),
            right: CreateRenderTexture(this, 200, 200, 0xC4C400, '4'),
            top: CreateRenderTexture(this, 200, 200, 0xC4C4C4, '5'),
            bottom: CreateRenderTexture(this, 200, 200, 0x545454, '6'),
        })

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            cube.rotationY += pointer.velocity.x * (1 / 800);
            cube.rotationX += pointer.velocity.y * (1 / 800);
        });

        this.add.graphics({
            lineStyle: {
                width: 3,
                color: 0xffffff,
                alpha: 1
            }
        })
            .strokeRect(300, 200, 200, 200)
    }

    update() {
    }
}

var text;
var CreateRenderTexture = function (scene, width, height, color, name) {
    if (text === undefined) {
        text = scene.make.text({ text: '', style: { fontSize: '32px' }, add: false })
            .setOrigin(0.5);
    }
    text.text = name;
    return scene.add.rexPerspectiveRenderTexture(0, 0, width, height, { hideCCW: true })
        .fill(color)
        .draw(text, width / 2, height / 2)
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
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);