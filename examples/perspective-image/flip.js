import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
        this.load.atlas('poker', 'assets/images/poker/poker.png', 'assets/images/poker/poker.json');
    }

    create() {
        this.add.image(300, 300, 'poker', 'diamonds-1');
        var image = this.add.rexPerspectiveImage(400, 300, 'poker', 'diamonds-1');

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        var GetStateString = function (image) {
            return `angleY=${Math.floor(image.angleY)}\nisFlippedY=${image.isFlippedY}`
        }


        var print = this.add.text(0, 0, GetStateString(image));
        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            image.rotationY += pointer.velocity.x * (1 / 800);
            print.setText(GetStateString(image));
        });
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