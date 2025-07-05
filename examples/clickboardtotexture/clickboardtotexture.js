import phaser from 'phaser/src/phaser.js';
import ClickboardToTextureCache from '../../plugins/texture/clickboardtotexture/ClickboardToTexture';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var image = this.add.image(1920 / 2, 1080 / 2).setVisible(false);

        var clickboardToTextureCache = new ClickboardToTextureCache(this, {
            key: 'image',
        })
            .on('paste', function (key) {
                image.setTexture(key).setVisible(true)
            })


    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);