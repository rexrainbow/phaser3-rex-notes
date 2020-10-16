import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var mushroom = this.add.image(0, 0, 'mushroom').setOrigin(0);
        var image = this.add.rexPerspectiveRenderTexture(200, 300, 150, 200);
        image
            .fill(0xffffff)
            .draw(mushroom, 10, 10)

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            image.rotationY += pointer.velocity.x * (1 / 800);
        });

        this.add.image(400, 300, image.texture.key);
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