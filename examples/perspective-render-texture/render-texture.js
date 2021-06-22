import 'phaser';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var mushroom = this.make.image({ key: 'mushroom', add: false });
        var numberText = this.make.text({
            text: '7',
            style: { color: 'red', fontSize: '36px', fontFamily: 'serif' },
            add: false
        }).setOrigin(1);

        var image = this.add.rexPerspectiveRenderTexture(400, 300, 150, 200);
        image.rt
            .fill(0x888888)
            .draw(numberText, 150, 200)
            .draw(mushroom, 75, 100)

        //this.debug = this.add.graphics();
        //image.setDebug(this.debug);

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            image.rotationY += pointer.velocity.x * (1 / 800);
        });

        this.add.image(600, 300, image.texture.key);
    }

    update() {
        // this.debug.clear();
        // this.debug.lineStyle(1, 0x00ff00);
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