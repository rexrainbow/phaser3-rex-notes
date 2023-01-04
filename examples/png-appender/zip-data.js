import phaser from 'phaser/src/phaser.js';
import PNGAppenderPlugin from '../../plugins/pngappender-plugin.js';
import { deflate, inflate } from 'pako'

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
        var src = [];
        for (var i = 0; i < 999999; i++) {
            src.push(i);
        }
        src = deflate(JSON.stringify(src))
        console.log(src);

        var buf = this.plugins.get('rexPNGAppender')
            .append(this.cache.binary.get('image'), src);
        console.log(buf);

        var result = this.plugins.get('rexPNGAppender')
            .extract(buf);
        result = JSON.parse(inflate(result, { to: 'string' }));

        console.log(result);

        // Worse result
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