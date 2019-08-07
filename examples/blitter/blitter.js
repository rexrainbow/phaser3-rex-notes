import Blitter from '../../plugins/gameobjects/blitter/blitterbase/Blitter.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';

const RandomBetween = Phaser.Math.Between;
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateRectangleTexture(this, 'dot', 16);
        var blitter = new Blitter(this, 400, 300, 'dot');
        this.add.existing(blitter);
        for (var i = 0; i < 100; i++) {
            blitter.create(RandomBetween(0, 800) - blitter.x, RandomBetween(0, 600) - blitter.y)
                .setTint(RandomBetween(0, 0xffffff));
        }

        this.blitter = blitter;
    }

    update() {
        // this.blitter.rotation += 0.01;
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
};

var game = new Phaser.Game(config);