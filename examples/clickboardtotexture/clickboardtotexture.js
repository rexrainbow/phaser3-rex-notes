import phaser from 'phaser/src/phaser.js';
import ClickboardToTexturePlugin from '../../plugins/clickboardtotexture-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var image = this.add.image(1920 / 2, 1080 / 2).setVisible(false);

        this.plugins.get('rexClickboardToTexture').add(this)
            .on('paste', async function (clickboardToTexture) {
                var key = 'image';
                await clickboardToTexture.saveTexturePromise(key);
                clickboardToTexture.releaseFile();
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexClickboardToTexture',
            plugin: ClickboardToTexturePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);