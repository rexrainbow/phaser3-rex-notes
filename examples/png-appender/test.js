import phaser from 'phaser/src/phaser.js';
import AppendData from '../../plugins/data/pngappender/AppendData.js';
import ExtractData from '../../plugins/data/pngappender/ExtractData.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.binary('image', 'assets/images/png-chunks/empty.png', Uint8Array);
    }

    create() {
        var src = { a: 10, b: 20, message: 'hello' };

        var buf = AppendData(this.cache.binary.get('image'), src);
        var result = ExtractData(buf);
        console.log(result);
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
    scene: Demo
};

var game = new Phaser.Game(config);