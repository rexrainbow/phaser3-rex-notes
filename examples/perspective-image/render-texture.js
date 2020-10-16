import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
    }

    create() {
        var image = this.add.rexPerspectiveRenderTexture(400, 300, 150, 200);
        image.fill(0xffffff);

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            image.rotationY += pointer.velocity.x * (1 / 800);
        });

        var rt = this.make.renderTexture({ x: 0, y: 0, width: 150, height: 200, add: true });
        rt.fill(0xffffff);
        this.add.image(500, 300, rt.texture.key);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
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