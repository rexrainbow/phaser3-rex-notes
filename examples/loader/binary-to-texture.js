import phaser from 'phaser/src/phaser.js';
import BinaryToTextureCache from '../../plugins/utils/loader/BinaryToTextureCache.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.binary('card', 'assets/images/card2.png', Uint8Array);
        this.load.once('filecomplete-binary-card', function () {
            BinaryToTextureCache(this, 'card', 'card', 'png');
        }, this);
    }

    create() {
        this.add.image(400, 300, 'card').setScale(0.3);
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);