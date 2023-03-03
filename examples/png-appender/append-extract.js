import phaser from 'phaser/src/phaser.js';
import PNGAppenderPlugin from '../../plugins/pngappender-plugin.js';
import BinaryToTextureCache from '../../plugins/utils/loader/BinaryToTextureCache.js';
import { saveAs } from 'file-saver';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.binary('image', 'assets/images/card2.png', Uint8Array);
    }

    create() {
        var pngBuffer = this.cache.binary.get('image');
        var result = this.plugins.get('rexPNGAppender')
            .extract(pngBuffer);
        console.log(result); // null, no custom data found

        var customData = { a: 10, b: 20, message: 'hello' };
        var buf = this.plugins.get('rexPNGAppender')
            .append(pngBuffer, customData);
        var result = this.plugins.get('rexPNGAppender')
            .extract(buf);
        console.log(result); // equal to customData

        BinaryToTextureCache(this, buf, 'image', 'png');
        this.load.once('filecomplete-image-image', function () {
            this.add.image(400, 300, 'image').setScale(0.5);
        }, this)
        this.load.start();

        // var blob = new Blob([buf]);
        // saveAs(blob, 'test.png');
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
    plugins: {
        global: [{
            key: 'rexPNGAppender',
            plugin: PNGAppenderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);